import React, {Component} from 'react'
import Note from './Note'

class Board extends Component {
    constructor(props){
        super(props);
        this.state = {
            notes: []
        }
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);   
        this.eachNote = this.eachNote.bind(this);
        this.remove = this.remove.bind(this);
        this.nextId = this.nextId.bind(this);
    }
    add(text) {
		this.setState(prevState => ({
			notes: [
				...prevState.notes,
				{
					id: this.nextId(),
					note: text
				}
			]
		}));
    }
    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    }
    update(newText, i) {
        console.log('updating item at index', i, newText);
        this.setState(prevState => ({
            // eslint-disable-next-line 
			notes: prevState.notes.map(
				note => (note.id !== i) ? note : {...note, note: newText}
			)
        })); //Using Callback function
    }
    remove(id) {
        console.log(`removing item at `, id);
        this.setState(prevState => ({
            notes: prevState.notes.filter( note => note.id !== id)
        }))
    }
    eachNote(note, i){
        return (
            <Note key={i}
                index={i}
                onChange={this.update}
                onRemove={this.remove}>
                {note.note}
            </Note>
        )
    }
    render() {
        return  (
            <div className="Board">
                {this.state.notes.map(this.eachNote)};
                <button 
                    onClick={this.add.bind(null, "New value")} 
                    id="add">
                    add
                </button>
            </div>
        )
    }
}

export default Board;