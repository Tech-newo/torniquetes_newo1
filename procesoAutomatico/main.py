from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import Chrome
from time import sleep

# TODO 1: set global variables
session_started = False
USER_ADMIN = "admin"
PASSWORD_ADMIN = "Gpsglobal2014"
PASSWORD_SEDE = "1502,0"
TIME_TO_WAIT = 1
TIME_OFF_LINE = 10

# TODO 2: start de web driver
driver = Chrome('/Users/be4tech/accesonewo/procesoAutomatico/chromedriver')
driver.get('http://localhost:8100/')


# TODO 3: validate the login status
def is_login():
    print(driver.current_url == 'http://localhost:8100/')
    if driver.current_url == 'http://localhost:8100/':
        return False
    else:
        return True


# TODO 2: login admin user
def login_administrator():
    try:
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//*[contains(@aria-labelledby,'ion-input-0-lbl')]")))
        user = WebDriverWait(driver,300).until(EC.presence_of_element_located((By.XPATH,"//*[contains(@aria-labelledby,'ion-input-0-lbl')]")))
        user.click()
        user.clear()
        user.send_keys(USER_ADMIN)
        password = WebDriverWait(driver,300).until(EC.presence_of_element_located((By.XPATH,"//*[contains(@aria-labelledby,'ion-input-1-lbl')]")))
        password.click()
        password.clear()
        password.send_keys(PASSWORD_ADMIN)
        location_code = WebDriverWait(driver,300).until(EC.presence_of_element_located((By.XPATH,"//*[contains(@aria-labelledby,'ion-input-2-lbl')]")))
        location_code.click()
        location_code.clear()
        location_code.send_keys(PASSWORD_SEDE)
        button_login = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="login"]')))
        button_login.click()
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="outputMessage"]')))
    except:
        print("Something went wrong")
    finally:
        print("The 'try except' is finished")



def process_data():
    message = WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.XPATH, '//*[@id="outputMessage"]')))
    print(message.text)
    if message.text == 'success':
        print('success')

    elif message.text == 'scanning':
        sleep(TIME_TO_WAIT)
        input_qr_code = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="qrCodeInput"]/input')))
        input_qr_code.click()
        input_qr_code.clear()
        input_qr_code.send_keys("2,121061,1502")
        input_qr_code.send_keys(Keys.ENTER)

    elif message.text == 'error':
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="outputMessage"]')))

    elif message.text == 'lost connection':
        print('lost connection')

    elif message.text == 'reset':
        print('reset')
        driver.get('http://localhost:8100/')

is_internet_on = True
while is_internet_on:
    sleep(TIME_TO_WAIT)
    if is_login():
        process_data()
    else:
        login_administrator()

print('Reset all')
