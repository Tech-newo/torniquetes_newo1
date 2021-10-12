from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import Chrome

# TODO 1: set global variables
session_started = False
is_internet_on = True

# TODO 2: start de web driver
driver = Chrome('/Users/be4tech/accesonewo/procesoAutomatico/chromedriver')
driver.get('http://localhost:8100/')


# TODO 3: validate the login status
def is_login():
    if driver.current_url == 'http://localhost:8100/':
        return False
    else:
        return True


# TODO 2: login admin user
def login_administrator():
    user = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//*[contains(@aria-labelledby,'ion-input-0-lbl')]")))
    user.click()
    user.clear()
    user.send_keys("admin")
    password = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//*[contains(@aria-labelledby,'ion-input-1-lbl')]")))
    password.click()
    password.clear()
    password.send_keys("Gpsglobal2014")
    location_code = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//*[contains(@aria-labelledby,'ion-input-2-lbl')]")))
    location_code.click()
    location_code.clear()
    location_code.send_keys("1502,0")
    button_login = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="login"]')))
    button_login.click()
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="outputMessage"]')))


def process_data():
    message = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="outputMessage"]')))
    print(message.text)
    if(message.text == 'registro Exitoso'):
        print('Registro Exitoso')
        '''
        elif (message.text == 'sin_internet'):
          print('sin_internet')
        '''
    elif(message.text == 'Escanea tu QR en el lector'):
        input_qr_code = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="qrCodeInput"]/input')))
        input_qr_code.click()
        input_qr_code.clear()
        input_qr_code.send_keys("2,121061,1502")
        input_qr_code.send_keys(Keys.ENTER)

    elif (message.text =='no es podible registrar la salida, debido a que el ultimo registro es una salida'):
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="outputMessage"]')))
    else:
        is_internet_on = False


while is_internet_on:
    if is_login():
        process_data()
    else:
        login_administrator()
