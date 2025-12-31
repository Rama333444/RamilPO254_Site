import {getLCP, getFID, getCLS, getINP, getFCP} from 'https://unpkg.com/web-vitals@3/dist/web-vitals.js';

const vitals = {};

function sendToAnalytics(metric) {
  vitals[metric.name] = metric.value;
  console.log(metric.name, metric.value);

}

getLCP(sendToAnalytics);
getFID(sendToAnalytics);
getCLS(sendToAnalytics);
getINP(sendToAnalytics);
getFCP(sendToAnalytics);

window.__vitals = vitals;
console.log('Web Vitals будут в window.__vitals');