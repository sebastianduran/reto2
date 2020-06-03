// Copyright 2013-2020, University of Colorado Boulder
/**
 * View for the robot object, which can be dragged to translate.
 *
 * @author sebastian
 */

import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import robotImage from '../../../images/robot_png.js';
import reto2 from '../../reto2.js';

class RobotNode extends Node {

  
  /**
   * @param {Robot} robot - the model of the robot
   * @param {ModelViewTransform2} modelViewTransform - the coordinate transform between model coordinates and view coordinates
   */
  constructor ( robot, modelViewTransform ) {

    super( {
      // Show a cursor hand over the bar magnet
      cursor: 'pointer'
    } );


    // Add the centered robot image
    const baseImage = new Image( robotImage, {
      centerX: 0,
      centerY: 0
    });

    this.addChild( baseImage);

    // Scale it so it matches the model width and height
    const scaleX = modelViewTransform.modelToViewDeltaX( robot.size.width ) / this.width;
    const scaleY = modelViewTransform.modelToViewDeltaY( robot.size.height ) / this.height;
    this.scale( scaleX, scaleY );

    // Observe changes in model position and update the view.
    // This element always exists and does not need to be unlinked.
    robot.positionProperty.link( position =>{
      this.translation = modelViewTransform.modelToViewPosition (position);
    });

    // Observe changes in model orientation and update the view.
    // This element always exists and does not need to be unlinked.
    robot.orientationProperty.link( orientation => {
      this.rotation = orientation;
    });
       
    /* ==== Una solucion para girar la imagen sobre un punto=========
    const aroundMultilink = Property.multilink(
      [ robot.pivotProperty, robot.spinAroundProperty ], (
        pivot, spinAround ) => {
        robot.orientationProperty.set( this.rotation );
        this.rotateAround( new Vector2(this.translation.x - pivot.x, this.translation.y - pivot.y) , spinAround );
      } );*/

  }
}


reto2.register( 'RobotNode', RobotNode );
export default RobotNode;