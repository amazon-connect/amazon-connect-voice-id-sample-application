//Connect CCP Integration

var loginWindow;
var instanceName = "CUSTOMER-CONNECT-INSTANCE"; // TODO: Change Instance Name
var instanceRegion = "CUSTOMER-CONNECT-REGION";// TODO: Change Region
var loginURL = `https://${instanceName}.awsapps.com/connect/login`;
var ccpUrl = `https://${instanceName}.awsapps.com/connect/ccp-v2`;

var voiceConnection;
var connectionId;
var contactId;
var agent;

window.ccp = window.ccp || {};

// Connect Initialization
connect.core.initCCP(document.getElementById("containerDiv"), {
    ccpUrl: ccpUrl,
    region: instanceRegion,
    loginPopup: true,
    loginPopupAutoClose: true,
    softphone: {
        allowFramedSoftphone: true
    }
});

connect.contact(subscribeToContactEvents);

function subscribeToContactEvents(contact) {
    window.ccp.contact = contact;
    updateGUI(contact.getAttributes());
    contact.onEnded(clearGUI);
}

function updateGUI(msg) {
    for (var key in msg) {
        if (msg.hasOwnProperty(key)) {
            if (key === 'VoiceIDAuthStatus') {
                $('#voice-id-prompt').text(msg[key]['value']);
                if (msg[key]['value'] === 'Not enrolled') {
                    $('#voice-id-prompt').text('NOT ENROLLED! Click on Enroll button to enroll the customer');
                    $('#register-voice-id').prop('disabled', false).css('opacity', 1).css('cursor', 'pointer');
                    $('#evaluate-voice-id').prop('disabled', false).css('opacity', 1).css('cursor', 'pointer');
                } else if (msg[key]['value'] === 'Not Authenticated' || msg[key]['value'] === 'Inconclusive' || msg[key]['value'] === 'Error') {
                    $('#voice-id-prompt').text(msg[key]['value'].toUpperCase() + '! Please try again');
                    $('#evaluate-voice-id').prop('disabled', false).css('opacity', 1).css('cursor', 'pointer');
                } else if (msg[key]['value'] === 'Authenticated') {
                    $('#voice-id-prompt').text('AUTHENTICATED!');
                    $('#evaluate-voice-id').prop('disabled', false).css('opacity', 1).css('cursor', 'pointer');
                    $('#opt-out').prop('disabled', false).css('opacity', 1).css('cursor', 'pointer');
                } else if (msg[key]['value'] === 'Opted Out') {
                    $('#voice-id-prompt').text('The caller has opted out of voice authentication.');
                    $('#register-voice-id').prop('disabled', true).css('opacity', 0.5).css('cursor', 'default');
                    $('#evaluate-voice-id').prop('disabled', true).css('opacity', 0.5).css('cursor', 'default');
                    $('#opt-out').prop('disabled', true).css('opacity', 0.5).css('cursor', 'default');
                }
            }
        }
    }
}

function clearGUI() {
    $('#voice-id-prompt').text('');
    $('#register-voice-id').prop('disabled', true).css('opacity', 0.5).css('cursor', 'default');
    $('#evaluate-voice-id').prop('disabled', true).css('opacity', 0.5).css('cursor', 'default');
    $('#opt-out').prop('disabled', true).css('opacity', 0.5).css('cursor', 'default');
    $('#loading-image').css('display', 'none');

    agent = new connect.Agent();
}


// Page Functions
$(() => {
    $('#register-voice-id').click(() => {
        enrollVoice();
    });

    $('#opt-out').click(() => {
        optOut();
    });

    $('#evaluate-voice-id').click(() => {
        authenticateVoice(false);
    });

});

function authenticateVoice(startNew) {
    $('#voice-id-prompt').text('Please wait for authentication ...');

    if (typeof agent === "undefined") {
        agent = new connect.Agent();
    }
    let agentConn = agent.getContacts()[0].getConnections()[0];
    $('#loading-image').css('display', 'inline-block');

    agentConn.evaluateSpeakerWithVoiceId(startNew)
        .then((response) => {
            $('#voice-id-prompt').text(response.AuthenticationResult.Decision);
            $('#loading-image').css('display', 'none');
            if (response.AuthenticationResult.Decision === 'Authenticated') {
                $('#opt-out').prop('disabled', false).css('opacity', 1).css('cursor', 'pointer');
                $('#voice-id-prompt').text('AUTHENTICATED!');
            }
        })
        .catch((error) => {
            console.log(error);
            $('#voice-id-prompt').text('auth failed');
            $('#loading-image').css('display', 'none');
        });
}

function enrollVoice() {
    $('#voice-id-prompt').text('Please wait while we enroll the customer...');
    if (typeof agent === "undefined") {
        agent = new connect.Agent();
    }
    let agentConn = agent.getContacts()[0].getConnections()[0];
    $('#loading-image').css('display', 'inline-block');
    agentConn.enrollSpeakerInVoiceId()
        .then((response) => {
            $('#voice-id-prompt').text(response.Session.EnrollmentRequestDetails.Status);
            $('#loading-image').css('display', 'none');
            if (response.Session.EnrollmentRequestDetails.Status === 'COMPLETED') {
                $('#register-voice-id').prop('disabled', true).css('opacity', 0.5).css('cursor', 'default');
                $('#opt-out').prop('disabled', false).css('opacity', 1).css('cursor', 'pointer');
                $('#voice-id-prompt').text('ENROLLED!');
            }
        })
        .catch((error) => {
            console.log(error);
            $('#voice-id-prompt').text('enrollSpeakerInVoiceId failed');
            $('#loading-image').css('display', 'none');
        });
}

function optOut() {
    $('#voice-id-prompt').text('Please wait while we opt-out the customer...');
    if (typeof agent === "undefined") {
        agent = new connect.Agent();
    }
    let agentConn = agent.getContacts()[0].getConnections()[0];
    $('#loading-image').css('display', 'inline-block');
    agentConn.optOutVoiceIdSpeaker()
        .then((response) => {
            $('#voice-id-prompt').text(response.Speaker.Status);
            $('#loading-image').css('display', 'none');
            if (response.Speaker.Status === 'OPTED_OUT') {
                $('#register-voice-id').prop('disabled', true).css('opacity', 0.5).css('cursor', 'default');
                $('#evaluate-voice-id').prop('disabled', true).css('opacity', 0.5).css('cursor', 'default');
                $('#opt-out').prop('disabled', true).css('opacity', 0.5).css('cursor', 'default');
                $('#voice-id-prompt').text('OPTED OUT!');
            }
        })
        .catch((error) => {
            console.log(error);
            $('#voice-id-prompt').text('optOutVoiceIdSpeaker failed');
            $('#loading-image').css('display', 'none');
        });
}