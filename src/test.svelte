<script>
	import { tweened } from 'svelte/motion';
    import { cubicOut, linear, cubicIn } from 'svelte/easing';

    import { poll_interval } from './stores';
    
    let tween_duration = 5000;

	const progress = tweened(0, {
		duration: $poll_interval,
		easing: linear
    });
    
    let current_progress = 0.00;

    setInterval(() => {
        current_progress += 0.1 * $poll_interval / 1000;
        if (current_progress > 1) {
            current_progress = 0;
        }
        progress.set(current_progress);
    }, $poll_interval);
</script>

<style>
	progress {
		display: block;
		width: 100%;
        color: #0366d6;
        background: 0%;
        border: none;
	}

    progress::-moz-progress-bar { background: blue; }
</style>

<progress value={$progress}></progress>

<button on:click={() => poll_interval.set(1000)}>
    1s
</button>

<p>{current_progress}</p>
<p>{$poll_interval}</p>