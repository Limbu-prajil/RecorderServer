let notes = document.getElementById('notes-to-play').innerText.split(' ');
console.log('Notes to play: \n', notes);
let playButton = document.getElementById('start-playing');

function getMelodyString(notes) {
  let melodyString = ''

  for (var i = 0; i < notes.length; i++) {
    melodyString += notes[i] + '/8 ';
  }

  return melodyString;
}

function playNotes(e) {
  console.log(e.target);
  console.log('PLAYING!!!');
  const player = new SimplePlayer();
  const sequenceParser = new SequenceParser(128, [2, 4]);
  let melody = getMelodyString(notes);
  console.log('Got melody: \n', melody);
  player.play(sequenceParser.parse([
    melody
  ]));
}

playButton.addEventListener('click', playNotes);
