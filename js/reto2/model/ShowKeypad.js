// Copyright 2018-2020, University of Colorado Boulder

/**
 * Display for GenericAreas
 *
 * @author Sebastian Duran
 */
import reto2 from '../../reto2.js';
import Property from '../../../../axon/js/Property.js';

class ShowKeypad{
        
    /**
     * 
     */
    constructor( ) {

        this.visible = new Property(false);
    }
}

reto2.register( 'ShowKeypad', ShowKeypad );
export default ShowKeypad;