// Copyright 2013-2020, University of Colorado Boulder

/**
 * Model of a simple robot.
 * The robot has fixed size, and mutable position and orientation.
 *
 * @author sebastian duran
 */
import reto2 from '../../reto2.js';
import Property from '../../../../axon/js/Property.js';

class Robot {
 /**
 * Create a new robot model. The robott has fixed size, and mutable position and orientation.
 *
 * @param {Dimension2} size - the size of the bar magnet in model coordinates
 * @param {Vector2} position - the position of the bar magnet in model coordinates
 * @param {number} orientation - in radians
 * 
 */
  constructor( size, position, orientation) {

    // @public (read-only) {Dimension2} the size of the bar magnet in model coordinates
    this.size = size;

    // @public {Vector2} the position of the bar magnet in model coordinates
    this.positionProperty = new Property( position );

    // @public {number} in radians
    this.orientationProperty = new Property( orientation );

    this.widthToWheel = 132;
  }
  /**
   * Restores the initial state of the Robot. This method is called when the simulation "Reset All" button is
   * pressed. Note that Robot.size is constant and does not need to be reset.
   * @public
   */
  reset() {
    this.positionProperty.reset();
    this.orientationProperty.reset();
  }
}

reto2.register( 'Robot', Robot );
export default ( Robot );