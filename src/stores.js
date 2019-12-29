import { writable } from 'svelte/store';
import fetchGraphQL from 'fetch-graphql';

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

// setInterval(() => {
//     current_time.update(1);
//     // if (curr_t > $end_time) {
//     //     current_time.set($start_time);
//     // }
// }, 5000)

// api_object.subscribe(value => console.log(value));
// server_object.subscribe(value => console.log(`server: ${value}`));

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

const graphql_url = 'http://localhost:4000/graphql';

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

update_objects();
setInterval(() => update_objects(), 5000);