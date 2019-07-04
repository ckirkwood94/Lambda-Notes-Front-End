import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { addData, editData, fetchData } from '../actions';

import NoteForm from '../components/Notes/NoteForm';

class AddNoteView extends Component {
	state = {
		form: {
			title: '',
			textBody: '',
		},
		note: null,
	};

	componentDidMount() {
		if (this.props.editForm) {
			const note = this.props.notes.find(
				note => note.id.toString() === this.props.match.params.noteId
			);
			if (note) {
				this.setState({
					form: {
						title: note.title,
						textBody: note.textBody,
					},
					note: note,
				});
			}
		}
	}

	resetForm() {
		this.setState({
			form: {
				titleInput: '',
				contentInput: '',
			},
		});
	}

	handleInput = event => {
		this.setState({
			form: {
				...this.state.form,
				[event.target.name]: event.target.value,
			},
		});
	};

	handleAddData = event => {
		event.preventDefault();
		this.props.addData(this.state.form);
		this.resetForm();
		this.props.history.push('/');
	};

	handleEdit = () => {
		this.props.editData(this.state.form, this.state.note.id);
		this.props.history.push(`/note/${this.state.note.id}`);
	};

	handleSubmit = event => {
		event.preventDefault();

		if (this.props.editForm) {
			this.handleEdit(this.state.note.id);
		} else {
			this.handleAddData(event);
		}
	};

	render() {
		return (
			<Container>
				<NoteForm
					{...this.props}
					form={this.state.form}
					handleInput={this.handleInput}
					handleSubmit={this.handleSubmit}
					editForm={this.props.editForm}
				/>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		notes: state.notesReducer.notes,
	};
};

export default connect(
	mapStateToProps,
	{ addData, editData, fetchData }
)(AddNoteView);

const Container = styled.div`
	height: 100%;
	width: 100%;
`;
