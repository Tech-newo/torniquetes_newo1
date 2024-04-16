import uvicorn
import RPi.GPIO as GPIO
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Configura el modo de los pines de la Raspberry Pi
GPIO.setmode(GPIO.BOARD)

def encender_pin(pin: int):
    # Configura el pin como salida
    GPIO.setup(pin, GPIO.OUT)
    # Comprueba el estado del pin antes de encenderlo
    estado_anterior = GPIO.input(pin)
    # Encender el pin
    GPIO.output(pin, True)
    # Comprobar el estado del pin después de encenderlo
    estado_actual = GPIO.input(pin)
    return {
        "pin": pin,
        "estado_anterior": estado_anterior,
        "estado_actual": estado_actual
    }

def apagar_pin(pin: int):
    # Configura el pin como salida
    GPIO.setup(pin, GPIO.OUT)
    # Comprueba el estado del pin antes de apagarlo
    estado_anterior = GPIO.input(pin)
    # Apagar el pin
    GPIO.output(pin, False)
    # Comprobar el estado del pin después de apagarlo
    estado_actual = GPIO.input(pin)
    return {
        "pin": pin,
        "estado_anterior": estado_anterior,
        "estado_actual": estado_actual
    }

def obtener_estado_pin(pin: int):
    # Configura el pin como entrada
    GPIO.setup(pin, GPIO.IN)
    # Comprueba el estado del pin
    estado = GPIO.input(pin)
    return {"pin": pin, "estado": estado}

@app.get("/encender/{pin}")
def encender(pin: int):
    return encender_pin(pin)

@app.get("/apagar/{pin}")
def apagar(pin: int):
    return apagar_pin(pin)

@app.get("/consultar/{pin}")
def consultar(pin: int):
    return obtener_estado_pin(pin)


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=4000, debug=True)
