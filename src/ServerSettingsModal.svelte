<script>
    import { createEventDispatcher, onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();
    const close = () => dispatch('close');
    const submission = () => {
        dispatch('submission');
        dispatch('close');
    }

	let modal;

	const handle_keydown = e => {
		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	};

	const previously_focused = typeof document !== 'undefined' && document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}
</script>

<svelte:window on:keydown={handle_keydown}/>

<div class="modal-background" on:click={close}></div>

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
	<slot name="header"></slot>
    <br>
	<!-- <hr> -->
	<slot></slot>
    <br>
	<!-- <hr> -->

	<!-- svelte-ignore a11y-autofocus -->
	<!-- <button autofocus on:click={close}>close modal</button> -->
    <div class="user-actions">
        <span class="cancel" on:click={close}>Cancel</span>
        <span class="accept" on:click={submission}>Accept</span>
    </div>
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.3);
	}

	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4em);
		max-width: 38em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%,-50%);
		padding: 1em;
		border-radius: 0.2em;
		background: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.29);
	}

	button {
		display: block;
	}

    .user-actions {
        display: flex;
        justify-content: flex-end;
    }

    .cancel {
        color: red;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 5px;
        cursor: pointer;
    }

    .cancel:hover {
        background: rgb(253, 229, 232);
        transition-duration: 400ms;
    }

    .accept {
        color: blue;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 5px;
        cursor: pointer;
    }

    .accept:hover {
        background: rgb(235, 246, 250);
        transition-duration: 400ms;
    }
</style>
