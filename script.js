import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
    stages: [
        { duration: '10s', target: 1 },
        { duration: '20s', target: 1 },

        { duration: '10s', target: 10 },
        { duration: '20s', target: 10 },

        { duration: '10s', target: 50 },
        { duration: '20s', target: 50 },

        { duration: '10s', target: 100 },
        { duration: '20s', target: 100 },

        { duration: '10s', target: 0 },
    ],

    thresholds: {
        errors: ['rate<0.05'],
        http_req_failed: ['rate<0.05'],
        http_req_duration: [
            'p(95)<200',
            'p(99)<500',
        ],
    },
};

export function setup() {
    console.log('Starting performance test: http://ecommercekudadiri.my.id/api/products');
    console.log('Scenario: 10s ramp-up → 50s at 100 VUs → 10s ramp-down');
}

export function teardown() {
    console.log('Performance test completed');
}

export default function () {
    const response = http.get('http://ecommercekudadiri.my.id/api/products');

    errorRate.add(response.status !== 200);

    check(response, {
        'status is 200': (r) => r.status === 200,

        'response time < 200ms': (r) =>
            r.timings.duration < 200,

        'response has body': (r) =>
            r.body.length > 0,

        'content type is JSON': (r) =>
            r.headers['Content-Type'] &&
            r.headers['Content-Type'].includes('application/json'),
    });
}