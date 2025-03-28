const step1 = document.querySelector('.step1'),
step2 = document.querySelector('.step2'),
step3 = document.querySelector('.step3'),
email = document.getElementById('email'),
verifyEmail = document.getElementById('verifyEmail'),
inputs = document.querySelectorAll('.otp-group input'),
checkButton = document.querySelector('.checkButton'),
verifyButton = document.querySelector('.verifyButton');

let OTP = '';


window.addEventListener('load', () => {
    emailjs.init('xxxx');
    step2.style.display = 'none';
    step3.style.display = 'none';
    checkButton.classList.add('disable');
    verifyButton.classList.add('disable');
});

const validateEmail = (email)=>{
    let regex = /\S+@\S+\.\S+/;
    if (regex.test(email)) {
        checkButton.classList.remove('disable');
    } else{
        checkButton.classList.add('disable');
    };
};

const generateOTP = ()=>{
    return Math.floor(1000 + Math.random() * 9000);
};

inputs.forEach((input) => {
    input.addEventListener("keyup", function (e){
        if (this.value.legth >= 1 ){
            e.target.value = e.target.value.substr(0, 1);
        }

        if (inputs[0].value!='' && inputs[1].value!='' &&
            inputs[2].value!='' && inputs[3].value!=''){
                verifyButton.classList.remove('disable');
            }

        else{
            verifyButton.classList.add('disable');
        }
    });
});

const serviceID = 'xxxx';
const templateID = 'xxxx';
checkButton.addEventListener('click',()=>{
    OTP = generateOTP();
    checkButton.innerHTML= 'Sending...';

    let templateParameter = {
        from_name:'YOUR_NAME_OR_COMPANY_NAME HERE',
        OTP: OTP,
        message:'Use the OTP to validate the access.',
        reply_to: email.value,
    };


    emailjs.send(serviceID, templateID, templateParameter).then(
    (res) => {
        console.log(res);
        checkButton.innerHTML= 'Check OTP';
        step1.style.display = 'none';
        step2.style.display = 'block';
        step3.style.display = 'none';
    },
    (err)=>{
        console.log(err);
    }
);
});

verifyButton.addEventListener('click',()=>{
    let values = '';
    inputs.forEach((input) => {
        values += input.value;
    });

    if (OTP == values) {
        step1.style.display = 'none';
        step2.style.display = 'none';
        step3.style.display = 'block';
    }
    else {
        verifyButton.classList.add('error-shake');

        setTimeout(() => {
            verifyButton.classList.remove('error-shake');
        }, 1000);
    }
});

function changeEmail(){
    step1.style.display = 'block';
    step2.style.display = 'none';
    step3.style.display = 'none';
};