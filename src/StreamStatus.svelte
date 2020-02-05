<script>
    import { primary, text_on_color } from './theme.js';
    import { valid_object } from './stores';

    let state_icon = "pause";

    const unsub_valid = valid_object.subscribe((value) => {
        state_icon = "pause";
        if (value.force_stop) {
            state_icon = "not_interested";
        } else if (value.valid_dj) {
            state_icon = "play_arrow";
        }
    });
</script>

<style>
    .material-icons {
        color: var(--primary-color);
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 15px;
        margin-right: 15px;
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10+ and Edge */
        user-select: none; /* Standard syntax */
    }
</style>

<i class="material-icons" style="--primary-color:{$text_on_color}">{state_icon}</i>
