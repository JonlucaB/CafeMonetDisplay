"use client"; // I dub thee, "Client Component The I"

import React, { useState } from 'react';

export default function SignOnButtons() {
    const CLIENT_ID = '902933263655-ri7j71ajih2ming6im024d3k23muscq3.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyBk-u2uxkczqf8VgxtA0YLlZrLk0qc2pSE';
    
    // Discovery doc URL for APIs used by the quickstart
    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
    
    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
    
    let tokenClient;
    let gapiInited = false;
    let gisInited = false;
    
    const [visible, setVisibility] = useState('hidden');
    
    /**
     * The function that updates the state of visible
    */
   function updateVisibility() {
       setVisibility(gisInited && gapiInited ? 'visible' : 'hidden');
    }


   const [authorizeButtonText, setAuthorizeButtonText] = useState('Authorize');
   const [signoutButtonText, setSignOutButtonText] = useState('Sign Out');

   const updateAuthorizeButtonText = (newText) => setAuthorizeButtonText(newText);
   const updateSignOutButtonText = (newText) => setSignOutButtonText(newText);

    const [data, setContentData] = useState('Initial Data');

    const updateContentData = (newData) => setContentData(newData);

    /**
     * Callback after api.js is loaded.
     */
    function gapiLoaded() {
        gapi.load('client', initializeGapiClient);
        console.log("loaded the GAPI heyyy");
    }

    /**
     * Callback after the API client is loaded. Loads the
     * discovery doc to initialize the API.
     */
    async function initializeGapiClient() {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        updateVisibility
    }

    /**
     * Callback after Google Identity Services are loaded.
     */
    function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined later
        });
        gisInited = true;
        updateVisibility
        console.log("loaded the GIS heyyy");
    }

    /**
     *  Sign in the user upon button click.
     */
    function handleAuthClick() {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
            throw (resp);
            }
            updateAuthorizeButtonText('Refresh');
            await listUpcomingEvents();
        };

        if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            tokenClient.requestAccessToken({prompt: ''});
        }
    }

    /**
     *  Sign out the user upon button click.
     */
    function handleSignoutClick() {
        const token = gapi.client.getToken();
        if (token !== null) {
            google.accounts.oauth2.revoke(token.access_token);
            gapi.client.setToken('');
            updateContentData('');
            updateAuthorizeButtonText('Authorize');
        }
    }

    /**
     * Print the summary and start datetime/date of the next ten events in
     * the authorized user's calendar. If no events are found an
     * appropriate message is printed.
     */
    async function listUpcomingEvents() {
    let response;
    try {
        const request = {
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime',
        };
        response = await gapi.client.calendar.events.list(request);
    } catch (err) {
        updateContentData(err.message);
        return;
    }

    const events = response.result.items;
    if (!events || events.length == 0) {
        updateContentData('No events found.');
        return;
    }

    // Flatten to string to display
    const output = events.reduce(
        (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
        'Events:\n');
        updateContentData(output);
    }

    // we only want the buttons to be visible if a certian something something is true. those are:
    // gapiInited && gisInited
    return (
        <div>
            <button id="authorize_button" onClick={handleAuthClick} style={{visibility : visible}}>{authorizeButtonText}</button>
            <button id="signout_button" onClick={handleSignoutClick} style={{visibility : visible}}>{signoutButtonText}</button>

            <ContentChild data={data} />

            {/* The onLoad here doesn't work. change it */}
            <script src="https://apis.google.com/js/api.js" onLoad={gapiLoaded}></script>
            <script src="https://accounts.google.com/gsi/client" onLoad={gisLoaded}></script>
        </div>
    );
}

// temporary child I'm using just to display information
function ContentChild( {data} ) {
    return (
        <div>
            <h2>This is the calendar content in JSON format:</h2>
            <br />
            <p>{data}</p>
        </div>
    );
}