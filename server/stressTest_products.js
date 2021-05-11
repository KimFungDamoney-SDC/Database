import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 500,
  duration: '30s'
}
export default function() {
  http.get('http://localhost:3000/products/12/styles');
  sleep(1);
}