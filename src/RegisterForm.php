<?php
namespace WTForms;
/**
 * Class WT\RegisterForm
 *
 * Handles registering
 *
 */
class RegisterForm{

    public function custom_register(){
	
        $username = wp_slash( $_POST['user_name']);
        $email = wp_slash( $_POST['email']);
        $password = password_hash(esc_attr($_POST['password']), PASSWORD_DEFAULT);
        $phone_number = sanitize_text_field($_POST['phone']);

        $userdata = array(
            'user_login' => $username,
            'user_email' => $email,
            'user_pass' => $password
        );
        
    
        $user_id = wp_insert_user( $userdata );
        write_log("USER!!");
        write_log($user_id);
        update_user_meta($user_id, 'phone_number', $phone_number);
        
        //login user after register
        $user = get_user_by('login', $username);
        wp_set_current_user($user->ID);
        wp_set_auth_cookie($user->ID);
        wp_die();
    }

    public function get_cities(){
        global $wpdb;
        $countyId = $_POST['id'];
        $cities = $wpdb-> prefix. 'wedplan_romanian_cities';
        $array= $wpdb->get_results("
            SELECT name AS id, name
            FROM {$cities}
            WHERE county_id={$countyId}
        ");
        echo json_encode($array);
        wp_die();
    
    }
    
    public function check_email(){
        global $wpdb;
        $users = $wpdb -> prefix. 'users';
        $queryResults = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT * FROM $users WHERE user_email = %s",
                $_POST['email']
            )
        );
        if($queryResults){
            echo 'false';
        }
        else{
            echo 'true';
        }
        wp_die();
    }

    function email_otp(){
	
        $admin_email = get_option('admin_email');
        $message = "Codul tău de autentificare este ". $_POST['otp'];
        $to = $_POST['email'];
        $subject = "Cod înregistrare WTForms";
        $headers = "From: ". $admin_email;
        $mailSent = wp_mail($to, $subject, $message, $headers);
    
    }
}