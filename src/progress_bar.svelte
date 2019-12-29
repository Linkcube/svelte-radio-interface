<script>
	import { tweened } from 'svelte/motion';
    import { linear } from 'svelte/easing';

    import { poll_interval, start_time, api_object, end_time } from './stores';
    import { highlight, background, primary } from './theme.js';

	const progress = tweened(0, {
		duration: $poll_interval,
		easing: linear
    });

    const unsubscribe = api_object.subscribe((value) => {
        if (value !== null) {
            const current = value.current_time - value.start_time;
            const end = value.end_time - value.start_time;
            const prog = current / end;
            if (prog) progress.set(prog);
        }
    });

</script>

<style>
	progress {
		display: block;
		width: 100%;
        color: var(--primary-color);
        background: var(--background-color);
        border: none;
        height: 15px;
    }
    
    progress::-webkit-progress-bar {background-color: var(--background-color); width: 100%}

    progress::-moz-progress-bar { background: var(--primary-color); }

    progress::-webkit-progress-value { background: var(--primary-color); }
</style>

<progress value={$progress} style="--primary-color:{$highlight}; --background-color:{$background}"></progress>
