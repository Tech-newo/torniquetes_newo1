from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import Chrome
from time import sleep

# TODO 1: set global variables
USER_ADMIN = "admin"
PASSWORD_ADMIN = "Gpsglobal2014"
PASSWORD_SEDE = "1502,0"
TIME_TO_WAIT = 1
TIME_TO_LOGIN = 0.4
enable_access = False

# TODO 2: start de web driver
driver = Chrome('/Users/be4tech/accesonewo/procesoAutomatico/chromedriver')
driver.get('http://localhost:8100/')


# TODO 3: validate the login status
def is_login():
    if driver.current_url == 'http://localhost:8100/':
        return False
    else:
        return True


# TODO 4: login admin user
def login_administrator():
    try:
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//*[contains(@aria-labelledby,'ion-input-0-lbl')]")))
        user = WebDriverWait(driver, 100).until(EC.presence_of_element_located((By.XPATH,"//*[contains(@aria-labelledby,'ion-input-0-lbl')]")))
        user.click()
        user.clear()
        user.send_keys(USER_ADMIN)
        sleep(TIME_TO_LOGIN)
        password = WebDriverWait(driver, 100).until(EC.presence_of_element_located((By.XPATH,"//*[contains(@aria-labelledby,'ion-input-1-lbl')]")))
        password.click()
        password.clear()
        password.send_keys(PASSWORD_ADMIN)
        sleep(TIME_TO_LOGIN)
        location_code = WebDriverWait(driver, 100).until(EC.presence_of_element_located((By.XPATH,"//*[contains(@aria-labelledby,'ion-input-2-lbl')]")))
        location_code.click()
        location_code.clear()
        location_code.send_keys(PASSWORD_SEDE)
        sleep(TIME_TO_LOGIN)
        button_login = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="login"]')))
        button_login.click()
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="outputMessage"]')))
    except:
        print('except')
    finally:
        print('login_administrator()')


# TODO 5: Processing all events into qr logic
def process_data():
    try:
        message = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="outputMessage"]')))
        input_qr_code = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="qrCodeInput"]/input')))
        print(message.text)
        if message.text == 'scanning':
            enable_access = False
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="qrCodeInput"]/input')))
        elif message.text == 'reset':
            enable_access = False
            driver.get('http://localhost:8100/')
        elif message.text == 'starting':
            enable_access = False
            input_qr_code.click()
            input_qr_code.clear()
        elif message.text == 'success':
            enable_access = True
        else:
            enable_access = False
    except:
        print('login_administrator()')
        enable_access = False
    finally:
        print('process_data():', enable_access)


is_internet_on = True
while is_internet_on:
    sleep(TIME_TO_WAIT)
    if is_login():
        process_data()
    else:
        login_administrator()

