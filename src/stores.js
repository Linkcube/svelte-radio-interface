import { writable } from 'svelte/store';
import fetchGraphQL from 'fetch-graphql';

export const snackbar_store = writable(false);

export const poll_interval = writable(5000);

export const current_page = writable("main");

export const end_time = writable(10);

export const api_object = writable({
    np: "",
    listeners: 0,
    dj_name: "",
    dj_pic: "",
    start_time: "",
    end_time: "",
    current_time: "",
    lp: []
});

export const server_object = writable({
    bitrate: 0,
    sample_rate: 0,
    audio_format: "",
    server_name: "",
    server_description: ""
});

export const misc_object = writable({
    dj_image_link: "",
    rec_start: 0
});

export const valid_object = writable({
    valid_dj: false,
    force_stop: false
});

const api_query = `
query {
    api {
        np,
        listeners,
        dj_name,
        dj_pic,
        start_time,
        end_time,
        current_time,
        lp {
            meta,
            time,
            type,
            timestamp
        }
    }
}`;

const server_query = `
query {
    server {
        bitrate,
        sample_rate,
        audio_format,
        server_name,
        server_description,
    }
}`;

const misc_query = `
query {
    misc {
        dj_image_link,
        rec_start
    }
}`;

const valid_query = `
query {
    valid {
        valid_dj,
        force_stop
    }
}`;

const config_query = `
query {
    config {
        api_uri,
        server_uri,
        stream_uri,
        poll_interval,
        excluded_djs,
        export_folder
    }
}`;

const past_recordings_query = `
query {
    past_recordings {
        recordings {
            folder,
            songs,
            cover
        }
    }
}`;

const full_recording_query = (folder) => `
    query {
        full_recording(folder: "${folder}") {
            songs {
                title
                artist
                file
            }
        }
    }`
;

const recording_controls_query = (action) => `
    mutation {
        streamAction(action: "${action}")
    }
`;

const mutate_config_query = (config_data) => `
    mutation {
        updateConfig(config: {
            api_uri: ${JSON.stringify(config_data.api_uri)},
            excluded_djs: ${JSON.stringify(config_data.excluded_djs)},
            export_folder: ${JSON.stringify(config_data.export_folder)},
            poll_interval: ${JSON.stringify(config_data.poll_interval)},
            server_uri: ${JSON.stringify(config_data.server_uri)},
            stream_uri: ${JSON.stringify(config_data.stream_uri)}
        })
    }
`;

export const graphql_base = `${location.protocol}//${window.location.hostname}:4000`;

const graphql_url = `${graphql_base}/graphql`;

function update_objects() {
    fetchGraphQL(
        graphql_url,
        {},
        api_query,
    ).then(result => api_object.set(result.data.api));
    fetchGraphQL(
        graphql_url,
        {},
        server_query,
    ).then(result => server_object.set(result.data.server));
    fetchGraphQL(
        graphql_url,
        {},
        misc_query,
    ).then(result => misc_object.set(result.data.misc));
    fetchGraphQL(
        graphql_url,
        {},
        valid_query,
    ).then(result => valid_object.set(result.data.valid));
}

export function query_config() {
    return fetchGraphQL(
        graphql_url,
        {},
        config_query,
    );
}

export function change_config(new_config) {
    return fetchGraphQL(
        graphql_url,
        {},
        mutate_config_query(new_config),
    );
}

export const past_recordings_object = writable({});

export function update_past_recordings() {
    past_recordings_object.set(fetchGraphQL(
        graphql_url,
        {},
        past_recordings_query,
    ));
}

export function query_full_recordings(folder) {
    return fetchGraphQL(
        graphql_url,
        {},
        full_recording_query(folder)
    );
}

export function send_stream_action(action) {
    return fetchGraphQL(
        graphql_url,
        {},
        recording_controls_query(action)
    )
}

export function post_stream_action() {
    fetchGraphQL(
        graphql_url,
        {},
        valid_query,
    ).then(result => valid_object.set(result.data.valid));
    fetchGraphQL(
        graphql_url,
        {},
        misc_query,
    ).then(result => misc_object.set(result.data.misc));
}

update_objects();
setInterval(() => update_objects(), 5000);