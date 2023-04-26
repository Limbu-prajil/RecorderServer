let keyboardDiv = document.getElementById('simple-keyboard');
let notesRecorded = document.getElementById('notes-recorded');
let startRecordingButton = document.getElementById('start-recording');
let stopRecordingButton = document.getElementById('stop-recording');

let synth;
let recording = false; // This is a "flag" that keeps track wether we are recording or note

let notes = []; // This will hold the notes that the user has clicked

function startRecording() {
  // Empty out notes array, clear recorded notes and start recording
  notes = [];
  clearList();
  console.log('RECORDING STARTED WITH EMPTY NOTES ARRAY!');
  startRecordingButton.classList.add('recording');
  console.log('RED LIGHT ON');
  recording = true;
  console.log('RECORDING ON!!!');
}

function stopRecording() {
  // Turn recording off, and write the notes
  recording = false;
  console.log('RECORDING OFF');
  startRecordingButton.classList.remove('recording');
  console.log('RED LIGHT OFF');
  writeNotes();
}

function playNote(evt) {
  console.log('Event Triggered!\n', evt.target);
  // Find out the note that was played from the data attribute
  let note = evt.target.dataset.note;
  console.log(note, 'played!');
  // This will create a new synth or if it exists already do nothing
  synth = synth || new Tone.Synth().toMaster()
  // Play the note in the browser
  synth.triggerAttackRelease(note, '8n');
  console.log('Note triggered!');
  // If the note is defined, add it to an array of notes
  if(note !== undefined && recording) {
    console.log(`Added ${note} to notes array.`);
    notes.push(note)
  }
}

function clearList() {
  console.log('REMOVING NOTES RECORDED!');
  // Empty the notesRecorded list
  while(notesRecorded.firstChild) {
    notesRecorded.removeChild(notesRecorded.firstChild);
  }
}

function writeNotes() {
  // First clear out the (previously) recorded notes
  clearList();
  console.log('WRITING NOTES');
  // This has been added to recorder.html
  let noteNamesInput = document.getElementById('note-names');
  console.log(noteNamesInput);
  console.log(noteNamesInput.value);
  noteNamesInput.value = ''; //Clear the value of the input
  console.log('INPUT VALUE CLEARED');
  // Create list items for notes and add them to #notes-recorded
  console.log(`Looping for ${notes.length} times`);
  for (var i = 0; i < notes.length; i++) {
    let noteElement = document.createElement('li');
    noteElement.innerText = notes[i];
    notesRecorded.appendChild(noteElement);
    // Add each note to the input and add a space between them
    noteNamesInput.value += notes[i] + " ";
  }
  console.log('Recording notes \n',notesRecorded.children);
  console.log('Final note names: \n',noteNamesInput.value);
}
// Attach event listeners
keyboardDiv.addEventListener('click', playNote);
startRecordingButton.addEventListener('click', startRecording);
stopRecordingButton.addEventListener('click', stopRecording);
