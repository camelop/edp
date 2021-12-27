export function getTargets() {
    return fetch('http://localhost:3001/targets', {crossDomain:true})
        .then(response => response.json());
}
  