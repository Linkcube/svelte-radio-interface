<script context="module">
	const elements = new Set();

	export function stopAll() {
		elements.forEach(element => {
			element.pause();
		});
	}
</script>

<script>
	import { onMount } from 'svelte';
	 import { hover_color, primary_light, sub_text_color } from './theme.js';

	export let src;
	export let song;
	export let index;

	let audio;
	let paused = true;
	let duration;

	onMount(() => {
		elements.add(audio);
		return () => elements.delete(audio);
	});

	function stopOthers() {
		elements.forEach(element => {
			if (element !== audio) element.pause();
		});
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
</script>

<style>
	span {
		cursor: pointer;
		word-wrap: break-word;
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

<audio
	bind:this={audio}
	bind:paused
	bind:duration
	on:play={stopOthers}
	{src}
	preload="metadata"
></audio>