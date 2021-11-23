diagnosis = ['Well relax yourself, You seem fine.', "I'm sorry, but you seem to be infected with the covid 19 virus. Please contact your state helpline or the NCDC on 080097000010 (toll-free) immediately for further guidance.", "You seem to have hypertension, Please visit a doctor immediately, or proceed to the platform to book an appointment.", 'You seem to have Maleria, please seek medical help immediately.'];
levels = [["not at all", "no"], ["not"], ["mild", "i think so", "maybe", "kind of", "sort of"], ["a little", ], [], [], [], [], ['yeah'], ["yes", 'i am', 'i do', 'i have'], ['bad', "severe"]];
questions = ['Do you have a fever?', 'Are you coughing?', 'Do you have a headache?', "Are you vomiting or experiencing nausea?", "Do you feel muscle pain?", "Do you feel constant tiredness?", "Do you have dry cough?", "Are you expriencing chest pain?", "Are you experiencing difficulty in breathing", "Have you lost your sense of smell?", "Do you feel dizzy", "Do you have an irregular heart beat"];
a = [[ 0.27839992],
       [-0.47044653],
       [ 1.04131205],
       [ 0.1720988 ],
       [ 0.2570952 ],
       [ 0.7158649 ],
       [-0.44851841],
       [-0.28648141],
       [-0.07356378],
       [ 0.93240343],
       [ 0.8916077 ],
       [ 0.04437024]];
b = [0.460604];
responses = [];
symptoms = [];
let index = 0;

function appendChat(){
    if(index === questions.length + 1){
        _chat = '<div class="quick-response-body">\n' +
        '<button class="speech-bubble quick-response-button" value="Alright." style="text-align: left"><p>Alright.</p>\n' +
        '</button>\n' +
        '</div>\n' +
        '<div class="quick-response-body">\n' +
        '<button class="speech-bubble quick-response-button" value="Thank you." style="text-align: left"><p>Thank you.</p>\n' +
        '</button>\n' +
        '</div>\n' +
        '<div class="quick-response-body">\n' +
        '<button class="speech-bubble quick-response-button" value="Okay." style="text-align: left"><p>Okay.</p>\n' +
        '</button>\n' +
        '</div>'
    }
    else if (index <=questions.length){
        _chat = '<div class="quick-response-body">\n' +
        '<button class="speech-bubble quick-response-button" value="yes" style="text-align: left"><p>Yes</p>\n' +
        '</button>\n' +
        '</div>\n' +
        '<div class="quick-response-body">\n' +
        '<button class="speech-bubble quick-response-button" value="maybe" style="text-align: left"><p>Maybe</p>\n' +
        '</button>\n' +
        '</div>\n' +
        '<div class="quick-response-body">\n' +
        '<button class="speech-bubble quick-response-button" value="no" style="text-align: left"><p>No</p>\n' +
        '</button>\n' +
        '</div>'
    }
    else{
        _chat = '';
    }

    $('#chat-body').append('<span class="chat">\n' +
        '<img src="{{url_for(\'static\', filename=\'AI.jpg\')}}" width="30" height="30"/>'+
        '<div class="speech-bubble">\n' +
        '<p>'+chat + _chat
    );
}

function init(){
    chat = questions[index]+'</p>\n' +
        '</div>\n' +
        '</span>';
    setTimeout(function(){
            appendChat();
        }, 4300);
    index ++
}

$("#send-button").on("click", function () {
    let text = $('#reply').val();
    let passed = false;
    // alert(typeof('1.52007315300000020.460604'));
    // alert((parseFloat('1.52007315300000020.460604').toFixed(2)));
    loop1:
        for(_ = 0; _<levels.length; _++){
            for(__ = 0; __<levels[_].length; __++){
                if(text.includes(levels[_][__])){
                    symptoms.push(_ * 0.1);
                    passed = true;
                    break loop1;
                }
            }
    }
    if(index === questions.length){
        alert(parseInt(math.dot(symptoms, a) + b));
        chat = diagnosis[math.round(parseInt(math.dot(symptoms, a) + b))]+'</p>\n' +
        '</div>\n' +
        '</span>';
    }
    else if (index === questions.length+1){
        chat = ';)</p>\n' +
        '</div>\n' +
        '</span>';
    }
    else if (index > questions.length){
        index = 0;
        symptoms = [];
        chat = 'You could take the test again.</p>\n' +
        '</div>\n' +
        '</span>'+
        '<span class="chat">\n' +
        '<div class="speech-bubble second-speech-bubble">\n' +
        '<p>'+questions[index]+'</p>\n' +
        '</div>\n' +
        '</span>';
    }
    else if(passed){
        chat = questions[index]+'</p>\n' +
        '</div>\n' +
        '</span>';

    }else {
        chat = "i'm sorry, I'm not smart enough to understand that."+'</p>\n' +
        '</div>\n' +
        '</span>'+
        '<span class="chat">\n' +
        '<div class="speech-bubble second-speech-bubble">\n' +
        '<p>please use a simpler sentence for me.</p>\n' +
        '</div>\n' +
        '</span>';
        index --;
    }
    $('#chat-body').append(
        '<div align="right">\n' +
        '<div class="speech-bubble me-chat" style="text-align: left">\n' +
        '<p>'+text+'</p>\n' +
        '</div>\n'+
        '</div>\n')  ;
    setTimeout(function(){
            appendChat();
        }, 900);
    $('#reply').val('');
    index++;
});


$(document).on('click', ".quick-response-button", function () {
    $('#reply').val($(this).val());
    $("#send-button").click();
    $(".quick-response-button").remove();
});


