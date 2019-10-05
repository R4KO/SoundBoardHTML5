var soundsSection = document.querySelector('#sounds');
var stopButton = document.querySelector('#stopButton');
var title = document.querySelector('#title');

var bg_non_active = '#ee6f57';
var bg_active = '#cb3737';
var bg = '#fafafa';
var txt_active = 'white';
var txt_non_active = 'black';

document.addEventListener("DOMContentLoaded", init);

var soundsPath = "./";

var sounds = [
/*
	{
		name: "", // Name of the sound as it will appear on the page
		src: "" // name of the file + extension
	}
*/
];

var preload;

function init(){
	addSoundsToPage(sounds);

	stopButton.addEventListener('click', stop);
	title.addEventListener('click', playRandom);

	createjs.Sound.registerSounds(sounds, soundsPath);
}

function stop() {
	if (preload != null) {
		preload.close();
	}

	createjs.Sound.stop();

	// décolorer le bouton
	soundsSection.querySelectorAll('.sound').forEach(function(target){
			target.style.background = bg_non_active;
			target.style.color = txt_non_active;
	});

	// au cas où
	title.style.background = '';
}

function playSound(target) {
	//Play the sound: play (src, interrupt, delay, offset, loop, volume, pan)
	
	target.style.background = bg_active;
	target.style.color = txt_active;

	var instance = createjs.Sound.play(soundsPath + sounds[target.id].src);
	if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
		return;
	}
	
	instance.addEventListener("complete", function (instance) {
		target.style.background = bg_non_active;
		target.style.color = txt_non_active;

		// au cas où
		title.style.background = '';
	});
	
}

function playRandom(){
	title.style.background = 'black';
	var random = Math.floor(Math.random() * sounds.length);
	var sound = document.getElementById(random);
	playSound(sound);
}

function addSoundsToPage(sounds){
	sounds.forEach(addSoundToPage);
}

function addSoundToPage(sound, index){
	var soundDiv = document.createElement('div');
	soundDiv.className = "sound";
	soundDiv.style.background = bg_non_active;
	soundDiv.style.color = txt_non_active;
	soundDiv.style.borderColor = bg_active;
	soundDiv.id = index.toString();
	var soundTitle = document.createElement('h2');
	soundTitle.textContent = sound.name;
	soundDiv.appendChild(soundTitle);
	soundDiv.setAttribute('onclick','playSound(this)');

	soundsSection.appendChild(soundDiv);
}