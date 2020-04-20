const express = require( "express" )
const project = require( "../data/helpers/projectModel" )
const router = express.Router()

router.get( "/", ( req, res ) => {
  project.get()
    .then( ( project ) => {
      res.status( 200 ).json( project )
    })
    .catch( ( err ) => {
      console.log( err )
      res.status( 500 ).json( {
        message: "The project information could not be retrieved."
      } )
    })
} )

router.get( "/:id", ( req, res ) => {
	project.get( req.params.id )
		.then( ( project ) => {
			if ( project ) {
				res.status( 200 ).json( project )
			} else {
				res.status( 404 ).json( {
					message: "The project with the specified ID does not exist."
				} )
			}
		} )
		.catch( ( err ) => {
			console.log( err )
			res.status(500).json({
				message: "The project information could not be retrieved."
			})
		})
})

router.post( "/", ( req, res ) => {
  console.log( req.body )
	if ( !req.body ) {
		return res.status( 400 ).json( {
			message: "Please provide name and description."
		} )
	}

	project.insert( req.body )
		.then( ( project ) => {
			res.status( 201 ).json( project )
		} )
		.catch( ( err ) => {
			console.log( err )
			res.status( 500 ).json( {
				message: "There was an error while saving the project to the database"
			} )
		} )
} )

router.put( "/:id", ( req, res ) => {
	if ( !req.body ) {
		return res.status( 400 ).json( {
			message: "Please provide title and contents for the project."
		} )
	}
  
	project.update( req.params.id, req.body )
		.then( ( project ) => {
			if ( project ) {
				res.status( 200 ).json( project )
			} else {
				res.status( 404 ).json( {
					message: "The project with the specified ID does not exist."
				} )
			}
		} )
		.catch( ( err ) => {
			console.log( err )
			res.status( 500 ).json( {
				message: "The project information could not be modified."
			} )
		} )
} )

router.delete( "/:id", ( req, res ) => {
  project.remove( req.params.id )
		.then( ( count ) => {
			if ( count > 0 ) {
				res.status( 200 ).json( {
					message: "The project was delorted",
				} )
			} else {
				res.status( 404 ).json( {
					message: "The project with the specified ID does not exist."
				} )
			}
		} )
		.catch( ( err ) => {
			console.log( err )
			res.status( 500 ).json( {
				message: "The project could not be removed"
			} )
		} )
} )


module.exports = router