import numpy as np
from flask import Flask, render_template, request, redirect

app = Flask(__name__)
a = np.array([[-0.18414577],
       [ 0.40803948],
       [ 0.29625091],
       [ 1.06936245],
       [-0.2409878 ],
       [ 0.28125362],
       [ 0.0271501 ],
       [ 0.17231925],
       [ 0.1495797 ]])
b = np.array([0.1974])
symptoms = []
diseases = ['You seem to have Maleria, please seek medical help immediately.', "I'm sorry, but you seem to be infected with the covid 19 virus. Please contact your state helpline or the NCDC on 080097000010 (toll-free) immediately for further guidance.", "You seem to have hypertension, Please visit a doctor immediately, or proceed to the platform to book an appointment."]
levels = [["no", "not at all"], ["not really", "not"], ["mild", "i think so", "maybe", "kind of", "sort of", "mildly"], ["a little", ], [], [], [], [], ['yeah'], ['bad', 'badly', "severely", "yes"]]
questions = ['Do you have a fever?', 'Are you coughing?', 'Do you have a headache?', "Are you vomiting or experiencing nausea?", "Do you feel muscle pain?", "Do you feel constant tiredness?", "Do you have dry cough?", "Are you expriencing chest pain?", "Are you experiencing difficulty in breathing", "Do you feel dizzy", "Do you have an irregular heart beat"]

# @app.route('/')
# def index():
#     return redirect('http://127.0.0.1:5000/[0,False]')

@app.route('/<_>', methods=["POST", "GET"])
def process_symptoms(_):
    passed_sentence = False
    if len(symptoms) < len(questions):
        try:
            arg_list = eval(_)
        except:
            arg_list = [0,False]
        if request.method == "POST":
            text = str(request.form['reply'])
            for group in levels:
                for phrase in group:
                    if phrase.strip().lower() in text:
                        symptoms.append(levels.index(group) * 0.1)
                        arg_list[0] += 1
                        passed_sentence = True
            arg_list[1] = not passed_sentence
            if arg_list[1]:
                return render_template('chatter.html', question="I'm sorry, I'm not smart enough to understand that.")
            return redirect('http://127.0.0.1:5000/'+str(arg_list))
        return render_template('chatter.html', question=questions[arg_list[0]])
    return redirect('http://127.0.0.1:5000/diagnosis')


@app.route('/', methods=['POST', "GET"])
def chatbot():
    return render_template('chatter.html', question=questions[0])


if __name__ == '__main__':
    app.run(debug=True)
