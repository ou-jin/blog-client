// const THREE = self.importScripts('https://cdn.skypack.dev/three@<0.116.0>') 
// console.log(THREE)
self.onmessage = ({ data: { question } }) => {
    console.log(question)
    self.postMessage({
      answer: 42,
    });
  };
 