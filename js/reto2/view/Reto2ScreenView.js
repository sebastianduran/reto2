// Copyright 2020, University of Colorado Boulder

/**
 * @author Sebastian Duran
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import GoPauseButton from './GoPauseButton.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Reto2Constants from '../../common/Reto2Constants.js';
import reto2 from '../../reto2.js';
import pistaImage from '../../../images/pista_png.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import RobotNode from './RobotNode.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import FlexometroNode from './FlexometroNode.js';
import ActionBlockNode from './ActionBlockNode.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import AlertDialogNode from './AlertDialogNode.js';
import ProtractorNode from './ProtractorNode.js';
import Property from '../../../../axon/js/Property.js';
import MovableDragHandler from '../../../../scenery-phet/js/input/MovableDragHandler.js';

class Reto2ScreenView extends ScreenView {

  /**
   * @param {Reto2Model} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    super( );

    this.self = this;

    const center = new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2);
    const shiftbackground = new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2 -96);
    const modelViewTransform = ModelViewTransform2.createOffsetScaleMapping( center, 1 );

    // Add the go button, but only if there is a puller attached
    // i18n - ensure that the go, pause, and return buttons will fit in between the puller toolboxes
    const goPauseButton = new GoPauseButton( model, tandem.createTandem( 'goPauseButton' ), {
      tandem: tandem.createTandem( 'goPauseButton' ) }
    );
    //Bloques de accion
    const actionblock1 = new ActionBlockNode (model, 'traslate', 1);
    const actionblock2 = new ActionBlockNode (model, 'rotate', 2);
    const actionblock3 = new ActionBlockNode (model, 'traslate', 3);
    const actionblock4 = new ActionBlockNode (model, 'rotate', 4);
    const actionblock5 = new ActionBlockNode (model, 'traslate', 5);
    const actionblock6 = new ActionBlockNode (model, 'rotate', 6);
    const actionblock7 = new ActionBlockNode (model, 'traslate', 7);
    const actionblock8 = new ActionBlockNode (model, 'rotate', 8);
    const actionblock9 = new ActionBlockNode (model, 'traslate', 9);

    const actionblockgroup = new HBox ({
      children: [goPauseButton,
         actionblock1,
         actionblock2,
         actionblock3,
         actionblock4,
         actionblock5,
         actionblock6,
         actionblock7,
         actionblock8,
         actionblock9
        ],
      spacing: -30,
      align: 'top',
      left: this.layoutBounds.left + 10,
      top: this.layoutBounds.top
    });
    
    //Imagen de fondo y pista =====
    this.addChild( new Image( pistaImage, {
      center: shiftbackground,
      scale: 0.88
    } ) );

    // Agregar el robot
    this.robotNode = new RobotNode(model.robot, modelViewTransform );
    this.addChild(this.robotNode);

    
    //Cinta de medida del scenary-phet
    this.addChild( new FlexometroNode(900,350));
    const protractorNode = new ProtractorNode( true , true, {
      scale: 0.5,
      centerX: 900,
      centerY: 200
    } );
    const protractorPosition = new Vector2( protractorNode.centerX, protractorNode.centerY );
    const protractorPositionProperty = new Property( protractorPosition );

    const protractorNodeListener = new MovableDragHandler( protractorPositionProperty );

    protractorPositionProperty.link( protractorPosition => {
      protractorNode.center = protractorPosition;
    } );

    protractorNode.addInputListener( protractorNodeListener );

    this.addChild(protractorNode);

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
      },
      right: this.layoutBounds.maxX - Reto2Constants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - Reto2Constants.SCREEN_VIEW_Y_MARGIN,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    

    this.addChild(actionblockgroup);

    this.alertDialogNode = new AlertDialogNode(model);
    this.addChild(this.alertDialogNode);
  }


}

reto2.register( 'Reto2ScreenView', Reto2ScreenView );
export default Reto2ScreenView;