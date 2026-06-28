radio.onReceivedNumber(function (receivedNumber) {
    // Seilbahn ist an der Station angekommen und wartet
    if (receivedNumber == 1 && arrived == 0) {
        MotorDriver.MotorStop(Motor.A)
    }
    // Seilbahn wurde von der Station wieder losgeschickt.
    if (receivedNumber == 2 && arrived == 0) {
        MotorDriver.MotorRun(Motor.A, Dir.backward, 4)
    }
    // Seilbahn soll zur Station zurückkehren
    if (receivedNumber == 3 && arrived == 0) {
        MotorDriver.MotorRun(Motor.A, Dir.forward, 4)
    }
    basic.showNumber(arrived)
})
input.onButtonPressed(Button.A, function () {
    arrived = 0
    basic.pause(100)
    MotorDriver.MotorRun(Motor.A, Dir.forward, 4)
})
function setDistance () {
    // P0 = Trigger
    pins.digitalWritePin(DigitalPin.P0, 0)
    control.waitMicros(4)
    // Trigger
    pins.digitalWritePin(DigitalPin.P0, 1)
    control.waitMicros(10)
    // P1 = Echo
    read_distance = 34 * (pins.pulseIn(DigitalPin.P1, PulseValue.High) / 2000)
    read_distance = Math.round(read_distance)
    return read_distance
}
input.onButtonPressed(Button.B, function () {
    arrived = 0
    basic.pause(100)
    MotorDriver.MotorRun(Motor.A, Dir.backward, 4)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    MotorDriver.MotorStop(Motor.A)
})
let dictance = 0
let read_distance = 0
let arrived = 0
arrived = 1
radio.setGroup(11)
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    basic.pause(500)
    dictance = setDistance()
    serial.writeValue("distance", dictance)
    // Seilbahn wird erkannt
    if (dictance < 5 && arrived == 0) {
        arrived = 1
        MotorDriver.MotorStop(Motor.A)
    }
    basic.showNumber(arrived)
})
