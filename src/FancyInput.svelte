<script>
    import { primary, highlight, input_hover_color } from './theme.js';
    export let value = "";
    export let label = "";
    export let border_color = $highlight;
    export let hover_color = $input_hover_color;
</script>

<style>
    input:hover {
        border-color: var(--hover-color);
    }

    input:focus {
        border-color: var(--border-color);
        transition-duration: 400ms;
        border-radius: 5px;
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

    label {
        font-weight: normal;
        left: 0;
        margin: 0;
        padding-left: 15px;
        padding-top: 7px;
        position: absolute;
        top: 0;
        pointer-events: none;
        background: none;
        
    }

    input:focus + label {
        color: var(--active-color);
        transform: scale(.75, .75) translate(-10px, -20px);
        transition-duration: 400ms;
        padding: 0% 5% 0%;
        margin-left: 5%;
        background: white;
        background-clip: padding-box;
    }

    input:not(:placeholder-shown) + label {
        transform: scale(.75, .75) translate(-10px, -20px);
        transition-duration: 400ms;
        padding: 0% 5% 0%;
        margin-left: 5%;
        background: white;
        background-clip: padding-box;
    }

    input:placeholder-shown + label {
        transition-duration: 400ms;
    }
</style>

<div class="form-field">
    <div class="form-field-control">
        <input {value} style="--border-color:{border_color}; --hover-color:{hover_color}" placeholder=" ">
        <label style="--active-color:{border_color}">{label}</label>
    </div>
</div>
