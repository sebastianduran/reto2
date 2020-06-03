// Copyright 2013-2020, University of Colorado Boulder

/** View for the robot object, which can be dragged to translate.
 *
 * @author sebastian duran
 * 
 */

import reto2 from '../../reto2.js';
import Property from '../../../../axon/js/Property.js';

class AlertDialogModel {


    constructor(message){


        this.dialogTextProperty = new Property (message);

    }

}

reto2.register( 'AlertDialogModel', AlertDialogModel );
export default ( AlertDialogModel );