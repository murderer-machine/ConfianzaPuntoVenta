<?php

namespace alekas\corelib;

class Numeros {

    public static function convertirDecimal($parametro) {
        return number_format($parametro, 2, '.', ',');
    }

}
