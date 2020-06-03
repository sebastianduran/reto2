// Copyright 2020, University of Colorado Boulder

/**
 * @author Sebastian Duran
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import reto2 from '../reto2.js';
import Reto2Model from './model/Reto2Model.js';
import Reto2ScreenView from './view/Reto2ScreenView.js';

class Reto2Screen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {
      backgroundColorProperty: new Property( 'white' ),
      tandem: tandem
    };

    super(
      () => new Reto2Model( tandem.createTandem( 'model' ) ),
      model => new Reto2ScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

reto2.register( 'Reto2Screen', Reto2Screen );
export default Reto2Screen;