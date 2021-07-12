'use strict';
console.log('Loading function');
const https = require('https');
const url = require('url');
var AWS = require('aws-sdk');
var connect = new AWS.Connect();

exports.handler = (event, context, callback) => {
    console.log('Received Event from CFT:', JSON.stringify(event));
    var QueueArn = event.ResourceProperties.BASIC_QUEUE_ARN;
    let responseStatus = 'FAILED';
    let responseData = {};
    if (event.RequestType === 'Create') {
        console.log('Creating Contact Flow ...');

        var createContactFlowParams = {
            Content: '{\"Version\":\"2019-10-30\",\"StartAction\":\"fb1f2936-4c39-4902-b7e8-1b2cdc22b509\",\"Metadata\":{\"entryPointPosition\":{\"x\":15,\"y\":15},\"snapToGrid\":false,\"ActionMetadata\":{\"573d18af-cbc3-4f22-b1c9-ad060ddefaf1\":{\"position\":{\"x\":2742.9008515815085,\"y\":591}},\"3de55bd9-b0cc-4492-9bbc-b5401d439ab2\":{\"position\":{\"x\":2725,\"y\":225}},\"82282188-1ff9-49c1-b612-7d70b88fdf0c\":{\"position\":{\"x\":2751,\"y\":418}},\"467bb7f9-15a1-4ce4-a7ae-abbdce713236\":{\"position\":{\"x\":2739,\"y\":760}},\"e2e6e9c9-dd88-4001-8ebb-0f98096945a3\":{\"position\":{\"x\":2745.9008515815085,\"y\":955}},\"d60fbccb-d296-4629-9ee0-2e59bfe16164\":{\"position\":{\"x\":3049,\"y\":222},\"useDynamic\":false},\"46c3f802-489c-4c01-a595-c6b73cad9f47\":{\"position\":{\"x\":2725.9008515815085,\"y\":34}},\"eef4aa12-4901-4844-971c-e714ee6595f6\":{\"position\":{\"x\":2449.9008515815085,\"y\":26},\"useDynamic\":false},\"aef8e373-ed15-4565-88b7-f86d50bc469e\":{\"position\":{\"x\":2458,\"y\":209},\"useDynamic\":false},\"18efd38d-db69-4dcc-a08e-6a16fc102563\":{\"position\":{\"x\":2469.9008515815085,\"y\":410},\"useDynamic\":false},\"2d3ede29-e22d-4c34-9b27-18148dc647e0\":{\"position\":{\"x\":2465.9008515815085,\"y\":579},\"useDynamic\":false},\"38dd59c3-e356-42ad-9742-fad2a604375e\":{\"position\":{\"x\":2463,\"y\":746},\"useDynamic\":false},\"fbfb93a6-ec88-4b74-93e5-abab3cf02b6a\":{\"position\":{\"x\":2451,\"y\":986},\"useDynamic\":false},\"5971cca5-b159-492d-894b-5e8f56ba6260\":{\"position\":{\"x\":2129.9008515815085,\"y\":719},\"useDynamic\":false},\"d3224b6d-d122-42df-b209-2e6a18b9e0e2\":{\"position\":{\"x\":2122.9008515815085,\"y\":537},\"useDynamic\":false},\"aecd8bb9-668c-40c2-8e0f-f08ab4eb0332\":{\"position\":{\"x\":1150,\"y\":18},\"useDynamic\":false},\"fdd23a1a-34c4-4fee-8749-8d2a7ed2eede\":{\"position\":{\"x\":1375.9008515815085,\"y\":16}},\"fe89f1d8-7df0-451d-bb6a-e187c4f5869f\":{\"position\":{\"x\":2117.9008515815085,\"y\":31}},\"6d4e7949-acf9-464f-80d7-a0436c13d426\":{\"position\":{\"x\":1627.9008515815085,\"y\":15},\"useDynamic\":false},\"1376cad7-c217-4202-b5ec-c22a06513bd0\":{\"position\":{\"x\":3250,\"y\":255}},\"7efeb30e-619f-4bd1-8302-ab5a5acc97c2\":{\"position\":{\"x\":1867.9086640815085,\"y\":22.01562786102295},\"useDynamic\":false,\"useDynamicForEncryptionKeys\":true,\"useDynamicForTerminatorDigits\":false,\"countryCodePrefix\":\"+1\"},\"c9501c88-cac7-40ed-a008-287474705969\":{\"position\":{\"x\":2119.9008515815085,\"y\":366},\"useDynamic\":false},\"77b4ac77-7032-4db4-89ce-be57c77ecc26\":{\"position\":{\"x\":896.9008515815085,\"y\":27},\"useDynamic\":false},\"97d7ae6e-7b44-4edc-afb1-352686c2364e\":{\"position\":{\"x\":657,\"y\":25},\"useDynamic\":false,\"queue\":{\"id\":\"' + QueueArn + '\",\"text\":\"BasicQueue\"}},\"fb1f2936-4c39-4902-b7e8-1b2cdc22b509\":{\"position\":{\"x\":156,\"y\":16}},\"bc2c6283-ebad-4e8f-b63a-9bc3905437b2\":{\"position\":{\"x\":397,\"y\":24},\"overrideConsoleVoice\":false,\"defaultVoice\":\"Standard\"}}},\"Actions\":[{\"Identifier\":\"573d18af-cbc3-4f22-b1c9-ad060ddefaf1\",\"Parameters\":{\"Attributes\":{\"VoiceIDAuthStatus\":\"Not enrolled\"}},\"Transitions\":{\"NextAction\":\"d60fbccb-d296-4629-9ee0-2e59bfe16164\",\"Errors\":[{\"NextAction\":\"d60fbccb-d296-4629-9ee0-2e59bfe16164\",\"ErrorType\":\"NoMatchingError\"}],\"Conditions\":[]},\"Type\":\"UpdateContactAttributes\"},{\"Identifier\":\"3de55bd9-b0cc-4492-9bbc-b5401d439ab2\",\"Parameters\":{\"Attributes\":{\"VoiceIDAuthStatus\":\"Not Authenticated\"}},\"Transitions\":{\"NextAction\":\"d60fbccb-d296-4629-9ee0-2e59bfe16164\",\"Errors\":[{\"NextAction\":\"d60fbccb-d296-4629-9ee0-2e59bfe16164\",\"ErrorType\":\"NoMatchingError\"}],\"Conditions\":[]},\"Type\":\"UpdateContactAttributes\"},{\"Identifier\":\"82282188-1ff9-49c1-b612-7d70b88fdf0c\",\"Parameters\":{\"Attributes\":{\"VoiceIDAuthStatus\":\"Inconclusive\"}},\"Transitions\":{\"NextAction\":\"d60fbccb-d296-4629-9ee0-2e59bfe16164\",\"Errors\":[{\"NextAction\":\"d60fbccb-d296-4629-9ee0-2e59bfe16164\",\"ErrorType\":\"NoMatchingError\"}],\"Conditions\":[]},\"Type\":\"UpdateContactAttributes\"},{\"Identifier\":\"467bb7f9-15a1-4ce4-a7ae-abbdce713236\",\"Parameters\":{\"Attributes\":{\"VoiceIDAuthStatus\":\"Opted Out\"}},\"Transitions\":{\"NextAction\":\"d60fbccb-d296-4629-9ee0-2e59bfe16164\",\"Errors\":[{\"NextAction\":\"d60fbccb-d296-4629-9ee0-2e59bfe16164\",\"ErrorType\":\"NoMatchingError\"}],\"Conditions\":[]},\"Type\":\"UpdateContactAttributes\"},{\"Identifier\":\"e2e6e9c9-dd88-4001-8ebb-0f98096945a3\",\"Parameters\":{\"Attributes\":{\"VoiceIDAuthStatus\":\"Error\"}},\"Transitions\":{\"NextAction\":\"d60fbccb-d296-4629-9ee0-2e59bfe16164\",\"Errors\":[{\"NextAction\":\"d60fbccb-d296-4629-9ee0-2e59bfe16164\",\"ErrorType\":\"NoMatchingError\"}],\"Conditions\":[]},\"Type\":\"UpdateContactAttributes\"},{\"Identifier\":\"d60fbccb-d296-4629-9ee0-2e59bfe16164\",\"Transitions\":{\"NextAction\":\"1376cad7-c217-4202-b5ec-c22a06513bd0\",\"Errors\":[{\"NextAction\":\"1376cad7-c217-4202-b5ec-c22a06513bd0\",\"ErrorType\":\"NoMatchingError\"},{\"NextAction\":\"1376cad7-c217-4202-b5ec-c22a06513bd0\",\"ErrorType\":\"QueueAtCapacity\"}],\"Conditions\":[]},\"Type\":\"TransferContactToQueue\"},{\"Identifier\":\"46c3f802-489c-4c01-a595-c6b73cad9f47\",\"Parameters\":{\"Attributes\":{\"VoiceIDAuthStatus\":\"Authenticated\"}},\"Transitions\":{\"NextAction\":\"d60fbccb-d296-4629-9ee0-2e59bfe16164\",\"Errors\":[{\"NextAction\":\"d60fbccb-d296-4629-9ee0-2e59bfe16164\",\"ErrorType\":\"NoMatchingError\"}],\"Conditions\":[]},\"Type\":\"UpdateContactAttributes\"},{\"Identifier\":\"eef4aa12-4901-4844-971c-e714ee6595f6\",\"Parameters\":{\"Text\":\"Our Voice ID system has authenticated you.\"},\"Transitions\":{\"NextAction\":\"46c3f802-489c-4c01-a595-c6b73cad9f47\",\"Errors\":[],\"Conditions\":[]},\"Type\":\"MessageParticipant\"},{\"Identifier\":\"aef8e373-ed15-4565-88b7-f86d50bc469e\",\"Parameters\":{\"Text\":\"Our Voice ID system has not authenticated you.\"},\"Transitions\":{\"NextAction\":\"3de55bd9-b0cc-4492-9bbc-b5401d439ab2\",\"Errors\":[],\"Conditions\":[]},\"Type\":\"MessageParticipant\"},{\"Identifier\":\"18efd38d-db69-4dcc-a08e-6a16fc102563\",\"Parameters\":{\"Text\":\"The results are inconclusive from our Voice ID system. We will have to ask you a few more security questions.\"},\"Transitions\":{\"NextAction\":\"82282188-1ff9-49c1-b612-7d70b88fdf0c\",\"Errors\":[],\"Conditions\":[]},\"Type\":\"MessageParticipant\"},{\"Identifier\":\"2d3ede29-e22d-4c34-9b27-18148dc647e0\",\"Parameters\":{\"Text\":\"We have a Voice ID system, but we have not recognized your voice. An agent will ask you if you wish to enroll in this security system.\"},\"Transitions\":{\"NextAction\":\"573d18af-cbc3-4f22-b1c9-ad060ddefaf1\",\"Errors\":[],\"Conditions\":[]},\"Type\":\"MessageParticipant\"},{\"Identifier\":\"38dd59c3-e356-42ad-9742-fad2a604375e\",\"Parameters\":{\"Text\":\"You have opted out of the Voice ID system. We will have to ask you a few security questions.\"},\"Transitions\":{\"NextAction\":\"467bb7f9-15a1-4ce4-a7ae-abbdce713236\",\"Errors\":[],\"Conditions\":[]},\"Type\":\"MessageParticipant\"},{\"Identifier\":\"fbfb93a6-ec88-4b74-93e5-abab3cf02b6a\",\"Parameters\":{\"Text\":\"There was an error in Check security status block\"},\"Transitions\":{\"NextAction\":\"e2e6e9c9-dd88-4001-8ebb-0f98096945a3\",\"Errors\":[],\"Conditions\":[]},\"Type\":\"MessageParticipant\"},{\"Identifier\":\"5971cca5-b159-492d-894b-5e8f56ba6260\",\"Parameters\":{\"Text\":\"Error in Set security behavior block\"},\"Transitions\":{\"NextAction\":\"1376cad7-c217-4202-b5ec-c22a06513bd0\",\"Errors\":[],\"Conditions\":[]},\"Type\":\"MessageParticipant\"},{\"Identifier\":\"d3224b6d-d122-42df-b209-2e6a18b9e0e2\",\"Parameters\":{\"Text\":\"Cannot set customer ID\"},\"Transitions\":{\"NextAction\":\"1376cad7-c217-4202-b5ec-c22a06513bd0\",\"Errors\":[],\"Conditions\":[]},\"Type\":\"MessageParticipant\"},{\"Identifier\":\"aecd8bb9-668c-40c2-8e0f-f08ab4eb0332\",\"Parameters\":{\"VoiceAuthentication\":\"50\",\"SecurityBehaviorOption\":\"Enable\"},\"Transitions\":{\"NextAction\":\"fdd23a1a-34c4-4fee-8749-8d2a7ed2eede\",\"Errors\":[{\"NextAction\":\"5971cca5-b159-492d-894b-5e8f56ba6260\",\"ErrorType\":\"NoMatchingError\"}],\"Conditions\":[]},\"Type\":\"SetSecurityBehavior\"},{\"Identifier\":\"fdd23a1a-34c4-4fee-8749-8d2a7ed2eede\",\"Parameters\":{\"CustomerId\":\"4e8206c7-dee7-456d-a36f-232886f9e445\"},\"Transitions\":{\"NextAction\":\"6d4e7949-acf9-464f-80d7-a0436c13d426\",\"Errors\":[{\"NextAction\":\"d3224b6d-d122-42df-b209-2e6a18b9e0e2\",\"ErrorType\":\"NoMatchingError\"}],\"Conditions\":[]},\"Type\":\"UpdateContactData\"},{\"Identifier\":\"fe89f1d8-7df0-451d-bb6a-e187c4f5869f\",\"Transitions\":{\"NextAction\":\"fbfb93a6-ec88-4b74-93e5-abab3cf02b6a\",\"Errors\":[{\"NextAction\":\"fbfb93a6-ec88-4b74-93e5-abab3cf02b6a\",\"ErrorType\":\"NoMatchingError\"}],\"Conditions\":[{\"NextAction\":\"eef4aa12-4901-4844-971c-e714ee6595f6\",\"Condition\":{\"Operator\":\"Equals\",\"Operands\":[\"Authenticated\"]}},{\"NextAction\":\"aef8e373-ed15-4565-88b7-f86d50bc469e\",\"Condition\":{\"Operator\":\"Equals\",\"Operands\":[\"NotAuthenticated\"]}},{\"NextAction\":\"18efd38d-db69-4dcc-a08e-6a16fc102563\",\"Condition\":{\"Operator\":\"Equals\",\"Operands\":[\"Inconclusive\"]}},{\"NextAction\":\"38dd59c3-e356-42ad-9742-fad2a604375e\",\"Condition\":{\"Operator\":\"Equals\",\"Operands\":[\"OptedOut\"]}},{\"NextAction\":\"2d3ede29-e22d-4c34-9b27-18148dc647e0\",\"Condition\":{\"Operator\":\"Equals\",\"Operands\":[\"NotEnrolled\"]}}]},\"Type\":\"CheckSecurityStatus\"},{\"Identifier\":\"6d4e7949-acf9-464f-80d7-a0436c13d426\",\"Parameters\":{\"Text\":\"So I can transfer you to the right team, In your own words, tell us what you are calling about\"},\"Transitions\":{\"NextAction\":\"7efeb30e-619f-4bd1-8302-ab5a5acc97c2\",\"Errors\":[],\"Conditions\":[]},\"Type\":\"MessageParticipant\"},{\"Identifier\":\"1376cad7-c217-4202-b5ec-c22a06513bd0\",\"Type\":\"DisconnectParticipant\",\"Parameters\":{},\"Transitions\":{}},{\"Identifier\":\"7efeb30e-619f-4bd1-8302-ab5a5acc97c2\",\"Parameters\":{\"Text\":\"\'\",\"StoreInput\":\"True\",\"InputTimeLimitSeconds\":\"16\",\"InputValidation\":{\"CustomValidation\":{\"MaximumLength\":\"20\"}},\"DTMFConfiguration\":{\"DisableCancelKey\":\"False\"}},\"Transitions\":{\"NextAction\":\"fe89f1d8-7df0-451d-bb6a-e187c4f5869f\",\"Errors\":[{\"NextAction\":\"c9501c88-cac7-40ed-a008-287474705969\",\"ErrorType\":\"NoMatchingError\"}],\"Conditions\":[]},\"Type\":\"GetParticipantInput\"},{\"Identifier\":\"c9501c88-cac7-40ed-a008-287474705969\",\"Parameters\":{\"Text\":\"Error in Store customer input block\"},\"Transitions\":{\"NextAction\":\"1376cad7-c217-4202-b5ec-c22a06513bd0\",\"Errors\":[],\"Conditions\":[]},\"Type\":\"MessageParticipant\"},{\"Identifier\":\"77b4ac77-7032-4db4-89ce-be57c77ecc26\",\"Parameters\":{\"SSML\":\"<speak>Thank you for calling . What product would you like to talk to us about today? <break time=\\\"4s\\\"/></speak>\"},\"Transitions\":{\"NextAction\":\"aecd8bb9-668c-40c2-8e0f-f08ab4eb0332\",\"Errors\":[],\"Conditions\":[]},\"Type\":\"MessageParticipant\"},{\"Identifier\":\"97d7ae6e-7b44-4edc-afb1-352686c2364e\",\"Parameters\":{\"QueueId\":\"' + QueueArn + '\"},\"Transitions\":{\"NextAction\":\"77b4ac77-7032-4db4-89ce-be57c77ecc26\",\"Errors\":[{\"NextAction\":\"77b4ac77-7032-4db4-89ce-be57c77ecc26\",\"ErrorType\":\"NoMatchingError\"}],\"Conditions\":[]},\"Type\":\"UpdateContactTargetQueue\"},{\"Identifier\":\"fb1f2936-4c39-4902-b7e8-1b2cdc22b509\",\"Parameters\":{\"FlowLoggingBehavior\":\"Enabled\"},\"Transitions\":{\"NextAction\":\"bc2c6283-ebad-4e8f-b63a-9bc3905437b2\",\"Errors\":[],\"Conditions\":[]},\"Type\":\"UpdateFlowLoggingBehavior\"},{\"Identifier\":\"bc2c6283-ebad-4e8f-b63a-9bc3905437b2\",\"Parameters\":{\"TextToSpeechVoice\":\"Salli\"},\"Transitions\":{\"NextAction\":\"97d7ae6e-7b44-4edc-afb1-352686c2364e\",\"Errors\":[],\"Conditions\":[]},\"Type\":\"UpdateContactTextToSpeechVoice\"}]}', 

            InstanceId: process.env.CONNECT_INSTANCE_ID, // PARAMETER
            Name: event.ResourceProperties.CONTACT_FLOW_NAME, // PARAMETER
            Type: 'CONTACT_FLOW', /* required */
            Description: 'VoiceID - Contact Flow',
        };
        connect.createContactFlow(createContactFlowParams, function (err, data) {
            if (err) {
                responseData = {
                    Error: 'Create Contact Flow operation failed'
                };
                console.log(err, err.stack); // an error occurred
                sendResponse(event, callback, context.logStreamName, responseStatus, responseData);
            }
            else {
                responseData.contactFlowArn = data.ContactFlowArn;
                responseData.contactFlowId = data.ContactFlowId;
                console.log(JSON.stringify(data));           // successful response
                responseStatus = 'SUCCESS';
                sendResponse(event, callback, context.logStreamName, responseStatus, responseData);
                callback(null, responseData);
            }
        });
    } else if (event.RequestType === 'Update' || event.RequestType === 'Delete') {
        responseStatus = 'SUCCESS';
        sendResponse(event, callback, context.logStreamName, responseStatus, responseData);
    }
};

/**
* Sends a response to the pre-signed S3 URL
*/
let sendResponse = function (event, callback, logStreamName, responseStatus, responseData) {
    const responseBody = JSON.stringify({
        Status: responseStatus,
        Reason: `See the details in CloudWatch Log Stream: ${logStreamName}`,
        PhysicalResourceId: logStreamName,
        StackId: event.StackId,
        RequestId: event.RequestId,
        LogicalResourceId: event.LogicalResourceId,
        Data: responseData,
    });
    const parsedUrl = url.parse(event.ResponseURL);
    const options = {
        hostname: parsedUrl.hostname,
        port: 443,
        path: parsedUrl.path,
        method: 'PUT',
        headers: {
            'Content-Type': '',
            'Content-Length': responseBody.length,
        }
    };
    const req = https.request(options, (res) => {
        callback(null, 'Successfully sent stack response!');
    });
    req.on('error', (err) => {
        console.log('sendResponse Error:\n', err);
        callback(err);
    });
    req.write(responseBody);
    req.end();
};