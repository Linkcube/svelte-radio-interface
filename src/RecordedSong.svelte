<script context="module">
	const elements = new Set();

	export function stopAll() {
		elements.forEach(element => {
			element.audio.pause();
		});
	}
</script>

<script>
	import { onMount } from 'svelte';
	import { hover_color, primary_light, sub_text_color, highlight, background } from './theme.js';
	import AudioControls from 'svelte-audio-controls';

	export let src;
	export let song;
	export let index;

	let audio;
	let controls;
	let paused = true;
	let duration;
	let elements_index = -1;

	onMount(() => {
		elements.add(controls);
		elements_index = elements.size;
		return () => elements.delete(controls);
	});

	function stopOthers() {
		elements.forEach(element => {
			if (element !== controls) {
				element.audio.pause();
				element.audio.currentTime = 0;
				element.hide();
			}
		});
		controls.show();
	}

	function formatSeconds(seconds) {
		if (isNaN(seconds)) return "No Data";
		var sec_num = parseInt(seconds, 10)
		var hours   = Math.floor(sec_num / 3600)
		var minutes = Math.floor(sec_num / 60) % 60
		var seconds = sec_num % 60

		return [hours,minutes,seconds]
			.map(v => v < 10 ? "0" + v : v)
			.filter((v,i) => v !== "00" || i > 0)
			.join(":")
	}
	
	function playNext() {
		if (elements_index < elements.size) {
			[...elements][elements_index].audio.play();
			controls.hide();
		}
	}
</script>

<style>
	span {
		cursor: pointer;
		word-wrap: break-word;
		padding: 5px;
		border-radius: 5px;
	}

    span:hover {
        background-color: var(--hover-color);
        transition-duration: 400ms;
        
    }

	.playing {
		background-color: var(--playing-color);
	}

	.sub-text {
		color: var(--primary-color);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>


<span 
	on:click={paused ? audio.play() : audio.pause()}
	class:playing={!paused}
	style="--hover-color:{$hover_color}; --playing-color:{$primary_light}"
>
	<p>{index + 1}. {song.title}</p>
	<div class="sub-text" style="--primary-color:{$sub_text_color}">
		<div>{song.artist}</div>
		<div>{formatSeconds(duration)}</div>
	</div>
</span>
<AudioControls
	{src}
	bind:this={controls}
	bind:audio
	bind:paused
	bind:duration
	disableTooltip={true}
	on:play={stopOthers}
	on:ended={playNext}
	iconColor={$sub_text_color}
	textColor={$sub_text_color}
	barPrimaryColor={$highlight}
	barSecondaryColor={$hover_color}
	backgroundColor={$background}
></AudioControls>