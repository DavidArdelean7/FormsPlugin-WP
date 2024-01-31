window.addEventListener('load', start);
function start(){
    if(document.getElementsByClassName('grw-form-page')[0]!=null && typeof(document.getElementsByClassName('grw-form-page')[0])!=undefined)
		 forms();
}

function forms(){
    //true for login, false for register
    let isLogin = true;
    // at least one(and only these type of characters) digit, lowercase, uppercase, special symbol, minimum 8 characters
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern =/^7\d{8}$/;
    const hiddenClass = 'grw-hidden';
    const errorClass = 'grw-error';
    const pageClass = '.grw-form-page';
    const activeTab = 'tab-active';
    const phoneNumber = "+400773792702";
    const username = "kha.zix780@yahoo.com";
    const secret ='F12AD9FE-722E-9178-71AB-C5D5C30DCD54';
    const sendUrl = "https://rest.clicksend.com/v3/sms/send";
    const checkUrl = "https://smsapi.growably.dev/public/api/get/otp";
    const getDevicesUrl = "https://smsapi.growably.dev/public/api/get/devices";
    const device = '00000000-0000-0000-a08e-5b5234167593';
    const pages = document.querySelectorAll(pageClass);
    const registerBtn = document.querySelector('#register_btn');
    const passwordField = document.querySelector('#password');
    const confirmPasswordField = document.querySelector('#confirm_password');
    const passwordBtn = document.querySelector('#password_btn');
    const checkOtpBtn= document.querySelector('.check_otp');
    const checkPhoneBtn = document.querySelector('#check_login_phone');
    const phonePage = checkPhoneBtn.closest(pageClass);
    const otpPage = checkOtpBtn.closest(pageClass);
    const emailBtn = document.querySelector('.email_btn');
    const emailOtpBtn = document.querySelector('#email_otp');
    const apiError = document.querySelector("#api_error");
    const phoneField = document.querySelector('#phone');
    const timerWrapper = document.querySelector('#timer');
    const resendOtp = document.querySelector('#resend_otp');
    const error = document.createElement('div');
    const prefix = jQuery('#prefixSelect');
    const county = jQuery('#countySelect');
    const city = jQuery('#citySelect');
    const animationLoader = jQuery('#loader-animation');
    const countyJs= document.querySelector('#countySelect');
    const cityJs = document.querySelector('#citySelect');
    const redirectURL = '/account-page/';
    const notNext = 'notnext';
    let establishedPhone, timer, sendCounter=0, otpByEmail=false;
    let currentData={};

    if(document.getElementById('login_form_email')!=null && typeof(document.getElementById('login_form_email'))!=undefined){
        const loginBtn = document.querySelector('#check_login');
        const emailLoginForm = document.querySelector('#login_form_email');
        loginBtn.addEventListener('click', ()=>{
            loginManagement();
        })
        emailLoginForm.addEventListener('keydown', (e)=>{
            if(e.key==='Enter'){
                loginManagement();
            }
        });

        function loginManagement(){

            let login = emailLoginForm.querySelector('#email').value;
            let password = emailLoginForm.querySelector('#password').value;
            let rememberme = emailLoginForm.querySelector('#rememberme').checked;
            jQuery.ajax({
        
                url: '/wp-admin/admin-ajax.php',
                type:'POST',
                data:{
                    action: 'login_email',
                    login : login,
                    password : password,
                    rememberme: rememberme
                },
            
                success: function (data){
            
                    if(data=='true'){
                        window.location.replace(redirectURL);
                    }
                    else{
                        emailLoginForm.querySelector('.grw-error').classList.remove(hiddenClass);
                    }
                },
            
                error: function(errorThrown){
            
                    window.alert(errorThrown);
                }
            })
        }
        (function tabs(){
            const phoneTabContent = document.querySelector('#phone-tab-content');
            const emailTabContent = document.querySelector('#email-tab-content');
            const phoneTab = document.querySelector('#phone-tab');
            const emailTab = document.querySelector('#email-tab');

            emailTab.addEventListener('click', ()=>{
                emailTabContent.classList.remove(hiddenClass);
                phoneTabContent.classList.add(hiddenClass);
                emailTab.classList.add(activeTab);
                phoneTab.classList.remove(activeTab);
            })

            phoneTab.addEventListener('click', ()=>{
                phoneTabContent.classList.remove(hiddenClass);
                emailTabContent.classList.add(hiddenClass);
                phoneTab.classList.add(activeTab);
                emailTab.classList.remove(activeTab);
            })
        })();
        

    }
    if(registerBtn!=null && typeof(registerBtn)!=undefined){

        isLogin= false;
        const form= document.querySelector('#register_form');

        const emailPage = emailBtn.closest(pageClass);

        passwordBtn.disabled=true;
        checkPassword(passwordField);
        checkPassword(confirmPasswordField);
        //zoneSelect(county, Counties, "Alege județul");
        //zoneSelect(city, JSON.stringify([]), "Alege orașul");
        //city.prop('disabled', true);
        emailPage.addEventListener('keydown', (e)=>{
            if(e.key==='Enter'){
                checkEmail();
            }
        });
        emailBtn.addEventListener('click', checkEmail);

        emailOtpBtn.addEventListener('click', resendOtpEmail);

        function resendOtpEmail (){ 
            emailOtpBtn.disabled=true;
            resendOtp.disabled=true;
            timer ? clearInterval(timer) : null;
            startTimer();
            emailOtp();
        }

        function registerUser(){
            jQuery.ajax({
                url: '/wp-admin/admin-ajax.php',
                type:'POST',
                data:{
                    action: 'custom_register',
                    user_name : form.querySelector('#first_name').value + '_' + form.querySelector('#last_name').value,
                    email : form.querySelector('#email').value,
                    password : form.querySelector('#password').value,
                    first_name : form.querySelector('#first_name').value,
                    last_name : form.querySelector('#last_name').value,
                    phone: window.phone,
                    rememberme : form.querySelector('#rememberme').checked,
                    //county: county.select2('data')[0].name,
                    //city: city[0].value
                },
                success: function(data){
                    window.location.replace(redirectURL);
                },
                error: function(errorThrown){
                    window.alert(errorThrown);
                }
            })
        }
    }

    (function phoneFormatter(){
        phoneField.addEventListener('input', function(event) {
            let inputText = event.target.value;
            const numericInput = inputText.replace(/\D/g, '');
            if (phonePattern.test(numericInput) ) {
                const formattedNumber = numericInput.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3');
                event.target.value = formattedNumber;
            } else if(numericInput.length>2){
                inputText = numericInput.replace(/^0/, '');
                event.target.value = inputText;
            }
        });
    })();

    (function prefixSelect(){

        let phonesInfo = JSON.parse(PhonePrefixes);
        prefix.select2({
            data: phonesInfo,
            dropdownParent: jQuery('.grw-form'),
            templateResult: formatOption,
            templateSelection: formatSelection, 
        });
        const predefinedValue = '+40';
        prefix.val(predefinedValue).trigger('change');

        function formatOption(option) {

            const optionMarkup = `
                <div class="custom-option">
                    <span class="flag-icon flag-icon-${option.code}"></span> ${option.text} (${option.id})
                </div>
            `;
            if(option.code && option.id)
                return jQuery(optionMarkup);
        }

        function formatSelection(option) {
            const selectedOptionMarkup = `
            <div class="selected-option">
                <span class="flag-icon flag-icon-${option.code}"></span> ${option.id}
            </div>
            `;
            if(option.code && option.id)
                return jQuery(selectedOptionMarkup);
        }

        function customMatcher(params, data) {
            if (!params.term || params.term.trim() === '') {
                return data;
            }
            const searchTerm = params.term.toLowerCase(); 
            if(data.id.toLowerCase().includes(searchTerm)){
                return data;
            }
            return null;
        }
    })();

    (function pagesManagement() {

        phonePage.addEventListener('keydown', (e)=>{
            if(e.key==='Enter' && !phonePage.getAttribute(notNext)){
                window.phone = prefix[0].value + (phoneField.value).replace(/ /g, '');
                otpManagement(checkPhoneBtn);
            }
        });
        otpPage.addEventListener('keydown', (e)=>{
            if(e.key==='Enter'){
                otpByEmail? checkEmailOtp(): checkOtp();
            }
        });

        if(!isLogin){
            const firstname_btn = document.querySelector('.firstname_btn');
            firstname_btn.addEventListener('click', firstname);
        }
        for(let i=0;i<pages.length; i++){

            if(pages[i].querySelector('.next_btn')){
                let btn =pages[i].querySelector('.next_btn');
                btn.addEventListener('click', ()=>{
                    if(checkFields(pages[i]) && !pages[i].getAttribute(notNext))
                        nextPage(btn);
                })
                pages[i].addEventListener('keydown',(e)=>{
                    if(e.key==='Enter' && checkFields(pages[i]) && (!pages[i].getAttribute(notNext))){
                        nextPage(btn);
                            
                    }
                })
            }
            if(pages[i].querySelector('.back_btn')){
                let btn = pages[i].querySelector('.back_btn')
                btn.addEventListener('click',()=>{
                    previousPage(btn);
                    //check if the page is the one for sending the OTP and check if the number is changed before sending it
                    if(!phonePage.classList.contains('grw-hidden')){
                    checkPhoneBtn.disabled=true;
                    phonePage.setAttribute(notNext, true);
                        phoneField.addEventListener('input',()=>{
                            if((prefix[0].value+(phoneField.value).replace(/ /g, ''))!=establishedPhone){
                                checkPhoneBtn.disabled=false;
                                phonePage.removeAttribute(notNext);
                            }
                            else{
                                checkPhoneBtn.disabled=true;
                                phonePage.setAttribute(notNext, true);
                            }
                        })
                    }
                })
            }
        }
    })();

    checkPhoneBtn.addEventListener('click', function(){
        window.phone = prefix[0].value + (phoneField.value).replace(/ /g, '');
        otpManagement(this);
    });
    checkOtpBtn.addEventListener('click', ()=>{otpByEmail? checkEmailOtp(): checkOtp();});
    resendOtp.addEventListener('click', resendOtpPhone);
    county.on('change', function(){
        let id = county[0].value;
        if(id!=''){
            city.val(null).trigger('change');
            citiesRetrieval(id);
            countyJs.closest('.field-wrapper').querySelector('.'+errorClass).classList.add(hiddenClass);
        }     
        else{
            city.prop('disabled', true);
            city.val(null).trigger('change');
            countyJs.closest('.field-wrapper').querySelector('.'+errorClass).classList.remove(hiddenClass);
        }
            
    })
    /*city.on('change', function(){
        let id = city[0].value;
        if(id!=''){
            cityJs.closest('.field-wrapper').querySelector('.'+errorClass).classList.add(hiddenClass);
        }     
        else{
            cityJs.closest('.field-wrapper').querySelector('.'+errorClass).classList.remove(hiddenClass);
        }
    })*/

    function resendOtpPhone (){
        sendOtp(); 
        resendOtp.disabled=true;
        !isLogin && emailOtpBtn ? emailOtpBtn.disabled=true :null ;
        timer ? clearInterval(timer) : null;
        startTimer();
    }
    function firstname(){
        const user_addressing = document.querySelectorAll('.firstname');
        let username = document.querySelector('#first_name').value;
        for(let i=0;i<user_addressing.length;i++){
            user_addressing[i].innerText = username;
        }
    }
    function nextPage(btn){
        btn.closest(pageClass).classList.add(hiddenClass);
        btn.closest(pageClass).nextElementSibling.classList.remove(hiddenClass);
        btn.classList.contains('firstname_btn')? firstname() : null;
        if(btn.closest(pageClass).nextElementSibling.contains(resendOtp)){
            !resendOtp.getAttribute('email') ? resendOtp.disabled=true : apiError.classList.remove(hiddenClass);
            !isLogin && emailOtpBtn ? emailOtpBtn.disabled=true :null;
        }
    }

    function previousPage(btn){
        btn.closest(pageClass).classList.add(hiddenClass);
        let prevPage = btn.closest(pageClass).previousElementSibling;
        prevPage.classList.remove(hiddenClass);
        let errors = prevPage.querySelectorAll('.'+errorClass+':not(.'+hiddenClass+')');
        for(let i=0; i<errors.length;i++){
            if(!errors[i].classList.contains(hiddenClass))
                errors[i].classList.add(hiddenClass);
        }
    }

    function otpManagement(btn){
        let error=phoneField.closest('.field-wrapper').querySelector('.'+ errorClass);
        let text;
        jQuery.ajax({

            url: '/wp-admin/admin-ajax.php',
            type:'POST',
            data:{
                action: 'login_phone',
                phone: window.phone,
            },
        
            success: function (data){

                isLogin ? text= 'Phone number not registered.' : text='Phone number already used';
                (phoneField.value=='')? text = "Please fill this required field": null;
                if(data==isLogin.toString()){

                    let randomOTP = Math.floor(100000 + Math.random() * 900000);
                    window.phone_otp = randomOTP;
                    sendOtp(btn);
                }    
                else {
                    //error.style.display='block!important';
                    error.innerText=text
                    error.classList.remove(hiddenClass);
                }
            },
        
            error: function(errorThrown){
        
                window.alert(errorThrown);
            }
        })
    }

 function sendOtp(btn){

        if(!isLogin && emailOtpBtn){
            sendCounter++;
            if(sendCounter ==2) emailOtpBtn.classList.remove(hiddenClass);
        }
        let error = phoneField.closest('.field-wrapper').querySelector('.'+ errorClass);
        
        let randomOTP = Math.floor(100000 + Math.random() * 900000);
        window.phone_otp = randomOTP;
        console.log("OTP:" + window.phone_otp);
        const base64Credentials = btoa(`${username}:${secret}`);
        const headers = new Headers({
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/json', 
          });
        
        let data = {
            messages: [
              {
                body: 'This is your OTP for WTForms: '+ window.phone_otp,
                to: window.phone,
                from : phoneNumber
              }
            ]
          };
          fetch(sendUrl, {

            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': `Basic ${base64Credentials}`,
                'Content-Type': 'application/json', 
              },


        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {

            console.log(window.phone_otp);
            console.log(base64Credentials);
            console.log(data);

            establishedPhone=window.phone;
            otpByEmail=false;
            if(data.data.messages[0].status=="SUCCESS"){
                console.log("SUCCESS");
                btn? nextPage(btn): null;
                timer ? clearInterval(timer) : null;
                startTimer();
                    
            }
            else{
                if(data.data.messages[0].status=="INVALID_RECIPIENT")
                    error.innerText = "Invalid phone number.";
                else {
                    error.innerText = "There's been a technical error. Try sending the code by email.";
                    apiErrorAction();
                    btn? nextPage(btn): null;
                }
                    
                error.classList.remove(hiddenClass);
                write_error(data);
            }
    
        })
        .catch(error => {
            console.error("Fetch error:", error);
        })

    }

    function checkOtp(){

        let otp = document.querySelector('#otp').value;

        if(otp==window.phone_otp){
            isLogin? loginUser() : registerUser();
        }
        else{

            error.innerText = "Invalid or expired SMS code.";
            document.querySelector('#otp').closest('.field-wrapper').querySelector('.'+ errorClass).classList.remove(hiddenClass);;
            error.style.display='block';
            !isLogin && emailOtpBtn  && otp!=''? emailOtpBtn.classList.remove(hiddenClass): null;
        }
    }

    function emailOtp(){
        let randomOTP = Math.floor(100000 + Math.random() * 900000);
        window.email_otp = randomOTP;
        jQuery.ajax({
            url: '/wp-admin/admin-ajax.php',
            type: 'POST',
            data: {
                action: 'email_otp',
                otp: randomOTP,
                email: currentData.email
            },
            success: function(data){
                otpByEmail=true;
            },
            error: function (errorThrown){
                window.alert(errorThrown)
            }
        })
    }

    function checkEmailOtp(){
        let enteredCode = otpPage.querySelector('#otp').value;
        if(enteredCode==window.email_otp){
            isLogin ? loginUser() : registerUser();
        
            }
        else {
            document.querySelector('#otp').closest('.field-wrapper').querySelector('.'+ errorClass).classList.remove(hiddenClass);;
            write_error("Cod OTP email invalid: "+ JSON.stringify(currentData));
        }
    }

    function getDevices(){
        
        let data ={
            secret: secret,
        };

        fetch(getDevicesUrl, {
            method: "POST",
            body: new URLSearchParams(data),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
    }

    function loginUser(){

        const phoneLoginForm = document.querySelector('#login_form');
        let rememberme = phoneLoginForm.querySelector('#rememberme').checked;
        jQuery.ajax({

            url: '/wp-admin/admin-ajax.php',
            type:'POST',
            data:{
                action: 'custom_user_login',
                phone: window.phone,
                rememberme : rememberme
            },

            success: function (data){

                window.location.replace(redirectURL);
                    
            },

            error: function(errorThrown){

                window.alert(errorThrown);
            }
        })
    }
    //field checkers
    function checkFields(page){

        let next = true;
        let reqFields = page.querySelectorAll('input[required="required"]');
        let visError = document.querySelector('.'+errorClass+':not(.' + hiddenClass + ')');
        if (visError && !page.getAttribute(notNext))
            visError.classList.add(hiddenClass);

        for(let i=0;i<reqFields.length; i++){

            let field = reqFields[i];
            let value= field.value;
            let error = field.closest('.field-wrapper').querySelector('.'+ errorClass);

            if(value==''){
                error.classList.remove(hiddenClass);
                next=false;
                return next;
            }
            else{
                currentData[field.name] = value;
            }
        }
        if((page.querySelector('#countySelect') && county[0].value=='') ){
            next=false;
            countyJs.closest('.field-wrapper').querySelector('.'+errorClass).classList.remove(hiddenClass);
        }
        else if(page.querySelector('#countySelect'))
            countyJs.closest('.field-wrapper').querySelector('.'+errorClass).classList.add(hiddenClass);
        if(page.querySelector('#citySelect') && city[0].value==''){
            next=false;
            cityJs.closest('.field-wrapper').querySelector('.'+errorClass).classList.remove(hiddenClass);
        }
        else if(page.querySelector('#citySelect'))
            cityJs.closest('.field-wrapper').querySelector('.'+errorClass).classList.add(hiddenClass);
            
        
        return next;
    }
    function checkPassword(field){
        const pError = passwordField.closest('.field-wrapper').getElementsByClassName(errorClass)[0];
        const cError = confirmPasswordField.closest('.field-wrapper').getElementsByClassName(errorClass)[0];
        const page = field.closest(pageClass);
        field.addEventListener('input', (e)=>{
            if(passwordField.value == confirmPasswordField.value && passwordPattern.test(passwordField.value)){
                passwordBtn.disabled=false;
                page.removeAttribute(notNext);
                cError.classList.add(hiddenClass);
                pError.classList.add(hiddenClass);
            }
            else {
                if(!passwordPattern.test(passwordField.value)){
                    pError.classList.remove(hiddenClass);
                    passwordBtn.disabled=true;
                    page.setAttribute(notNext, true);
                }
                if(passwordField.value != confirmPasswordField.value){
                    passwordBtn.disabled=true;
                    page.setAttribute(notNext, true);
                }
                if(confirmPasswordField.value!='' && passwordField.value != confirmPasswordField.value){
                    cError.classList.remove(hiddenClass);
                }
            }

            if(passwordPattern.test(passwordField.value)){
                pError.classList.add(hiddenClass);
            }
            if(confirmPasswordField.value=='' || passwordField.value == confirmPasswordField.value){
                cError.classList.add(hiddenClass);
            }

        })
    }
    function checkEmail(){
        let email = document.querySelector('#email');
        let error = email.closest('.field-wrapper').querySelector('.'+ errorClass);
        if(emailPattern.test(email.value)){
            jQuery.ajax({
                url: '/wp-admin/admin-ajax.php',
                type:'POST',
                data:{
                    action: 'check_email',
                    email : email.value,
                },
                success: function(data){
                    if(data=='false'){
                        error.innerText='Existing email address.';
                        error.classList.remove(hiddenClass);
                    }
                    else{
                        nextPage(emailBtn);
                        currentData.email = email.value;
                    }
                },
                error: function(errorThrown){
                    window.alert(errorThrown);
                }
            })
        }
        else{
            error.innerText="Incorrect email address.";
            error.classList.remove(hiddenClass);
        }
        
    }
    //location select
    function zoneSelect(target, data, placeholder){
        
        let zoneInfo = JSON.parse(data);
        target.select2({
            data: zoneInfo,
            allowClear:true,
            placeholder:placeholder,
            dropdownParent: jQuery('.grw-form'),
            templateResult: formatOption,
            templateSelection: formatSelection
            
        });

        function formatOption(option) {

            const optionMarkup = `
                <div class="custom-option">
                    ${option.name}
                </div>
            `;
            if(option.id)
                return jQuery(optionMarkup);
        }

        function formatSelection(option) {
            const selectedOptionMarkup = `
            <div class="selected-option">
                ${option.name}
            </div>
            `;
            if(option.id)
                return jQuery(selectedOptionMarkup);
            else return placeholder
        }
    }
    function citiesRetrieval(id){
        let placeholder = document.querySelector('#citySelect').closest('.select_container').querySelector('.select2-selection__placeholder');
        jQuery.ajax({
            url: '/wp-admin/admin-ajax.php',
            type: 'POST',
            data:{
                action: 'get_cities',
                id: id
            },
            beforeSend: function(xhr){
                animationLoader.show();
                placeholder.innerText = "Orașele se încarcă";
            },
            success: function(data){

                city.find('option:not(:first-child)').remove();
                zoneSelect(city, data, "Choose city");
                city.prop('disabled', false);
                placeholder.innerText = "Choose city";
                animationLoader.hide();

            },
            error: function(errorThrown){
                window.alert(errorThrown);
            }
        })
    }

    function apiErrorAction(){
        resendOtp.removeEventListener('click', resendOtpPhone);
        resendOtp.addEventListener('click', resendOtpEmail);
        resendOtp.setAttribute('email', true);
        resendOtp.disabled=false;
        emailOtpBtn.remove();
        timerWrapper.innerHTML='';

    }
    function write_error(message){

        if(currentData.length!=0)
            message = JSON.stringify(message) + JSON.stringify(currentData);
        else message = JSON.stringify(message);
        jQuery.ajax({
            url: '/wp-admin/admin-ajax.php',
            type: 'POST',
            data:{
                action: 'write_to_debug_log',
                message: message
            },
            error: function(errorThrown){
                window.alert(errorThrown);
            }
        })
    }

    function startTimer(){
        var sec = 30;
        timer = setInterval(function(){
            timerWrapper.innerHTML='(00:'+sec+')';
            sec--;
            if (sec < 0) {
                resendOtp.disabled=false;
                timerWrapper.innerHTML='';
                !isLogin ? emailOtpBtn.disabled=false: null;
                clearInterval(timer);
            }
        }, 1000);
    }

    function errorRegister(){
        setTimeout(function(){
            registerUser();
        }, 5000)
    }

}