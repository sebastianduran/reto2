// Copyright 2013-2020, University of Colorado Boulder

/** View for the robot object, which can be dragged to translate.
 *
 * @author Sebastian Duran
 * 
 */

import reto2 from '../../reto2.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';

class PowerSlider {

    constructor(power, enabled){

        this.powerProperty = new NumberProperty(power);
        this.enableSliderProperty = new Property(enabled);

    }

    reset(){
        this.powerProperty.reset();
    }

}

reto2.register( 'PowerSlider', PowerSlider );
export default ( PowerSlider );