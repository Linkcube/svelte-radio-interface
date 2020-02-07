<script>
    import { primary, highlight, input_hover_color, sub_text_color, hover_color } from './theme.js';
    export let value = "";
    export let label = "";
    export let border_color = $highlight;
    export let active_color = $input_hover_color;
    export let label_color = $sub_text_color;
    export let id;
    export let hint_text = "";
    export let hint_text_color = $hover_color;
</script>

<style>
    input:hover {
        border-color: var(--hover-color);
    }

    input:focus {
        border-color: var(--border-color);
        transition-duration: 400ms;
        border-radius: 5px;
        outline: 0;
    }

    input {
        margin: 8px;
        border-width: 2px;
        height: 40px;
        border-radius: 5px;
        width: 250px;
    }

    .form-field {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
    }

    .form-field-control {
        display: flex;
        flex-shrink: 1;
        border-radius: 8px 8px 0 0;
        overflow: hidden;
        position: relative;
        width: 100%;
    }

    .float-text {
        font-weight: normal;
        left: 0;
        margin: 0;
        padding-left: 15px;
        padding-top: 7px;
        position: absolute;
        top: 0;
        pointer-events: none;
        background: none;
        color: var(--text-color);
        
    }

    input:focus + .float-text {
        color: var(--active-color);
        transform: scale(.75, .75) translate(-10px, -20px);
        transition-duration: 400ms;
        padding: 0% 5% 0%;
        margin-left: 5%;
        background: white;
        background-clip: padding-box;
    }

    input:not(:placeholder-shown) + .float-text {
        transform: scale(.75, .75) translate(-10px, -20px);
        transition-duration: 400ms;
        padding: 0% 5% 0%;
        margin-left: 5%;
        background: white;
        background-clip: padding-box;
    }

    input:placeholder-shown + .float-text {
        transition-duration: 400ms;
    }

    .hint-text {
        color: var(--text-color);
        font-size: 14px;
        text-align: center;
        line-height: 0;
    }
</style>

<div class="form-field">
    <div class="form-field-control">
        <input {id} bind:value={value} style="--border-color:{border_color}; --hover-color:{active_color}" placeholder=" ">
        <label class="float-text" style="--active-color:{border_color}; --text-color:{label_color}">{label}</label>
    </div>
    <label class="hint-text" style="--text-color:{hint_text_color}">{hint_text}</label>
</div>
