<?php
namespace WTForms;

/**
 * Class WTForms\Auxiliary
 *
 * Handles shortcode functionalities
 * Handles error logging
 * Handles inserting options
 *
 */
class Auxiliary{

    public function __construct(){

    }
        
    public function write_to_debug_log() {
        $message = '"'.$_POST['message'].'"';
        $decodedMessage = json_decode($message, true);
    
        if (json_last_error() === JSON_ERROR_NONE) {
            $formattedJson = json_encode($decodedMessage, JSON_PRETTY_PRINT);
            $log_file = FORMS_PLUGIN_URL . '/grw-debug.txt';
    
            $log_entry = "[" . date('Y-m-d H:i:s') . "] " . $formattedJson . PHP_EOL;
            file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);
        }
    }
    
    public function login_form_shortcode(){
        
        $logged_in = is_user_logged_in();
        $logout_url =wp_logout_url( home_url() );
        if($logged_in){
            echo '<div class="logged_wrapper">
                <span id="already_logged">You`re already logged in.</span>
                <button id="logout_btn">
                <a href="'. $logout_url .'">Logout</a>
                </button>
                </div>
                ';
        }
        else {
            $this->create_form('grw-login-form.php');
        }
    }

    
    public function register_form_shortcode(){
        $this->create_form('grw-register-form.php');
        
    }

    function wc_lost_password_form_shortcode(){
        $this->create_form('wc-lost-password-form.php');
    }

    public function create_form($path){
        ob_start();
        include FORMS_PLUGIN_DIR . 'templates/forms/' . $path;
        $template = ob_get_clean();

        echo $template;
    }

    public function phone_prefixes(){
	
        $json_path= FORMS_PLUGIN_DIR . 'assets/json/phones_countries.json';
        $json_data = file_get_contents($json_path);
        $array = json_decode($json_data, true);
        
        if ($array!==null){
            $options =[];
            foreach($array as $element){
                    if(strstr($element['name'], " and", true))
                        $element['name']= strstr($element['name'], " and", true);
                    $code = strtolower($element['code']);
                    $options[] = array(
                        'id'=> $element['dial_code'],
                        'code' => $code,
                        'text'=> $element['name']
                    );
            }
            update_option('phone_options', serialize(json_encode($options)));
        } else {
            error_log('Failed to retrieve JSON file: ' . print_r($response, true));
        }
    }

    public function romanian_counties(){
	
        global $wpdb;
        $counties = $wpdb->prefix."wedplan_romanian_counties";
        $array = $wpdb-> get_results("
            SELECT id, name 
            FROM {$counties}
        ");
        update_option('romanian_counties', serialize(json_encode($array)));
    }
}