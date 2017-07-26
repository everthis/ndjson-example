const streamerr = e => {
  console.warn("Stream error");
  console.warn(e);
}

fetch("/api").then((response) => { 
  return can.ndjsonStream(response.body);

 }).then(todosStream => { 
  var reader = todosStream.getReader();

  reader.read().then(read = result => {
    if (result.done) {
      console.log("Done.");
      return;
    }

    console.log(result.value);
    render(result.value);

    reader.read().then(read, streamerr);
  }, streamerr);
 });

let counter = 0;

render = val => {
  const div = document.createElement('div');
  div.append('Fetched NDJSON row ', ++counter, ' : ', JSON.stringify(val));
  document.getElementsByTagName('body')[0].append(div);
}