import { groupBy, isDarkBackground, compareSemesters } from './functions.js';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import saveAs from 'file-saver';
import Dropzone from 'react-dropzone';
import ProgressBar from 'react-bootstrap/ProgressBar';
import LoginButton from './LoginButton.jsx'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import {DropdownButton} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

/*** Displays the flowchart view of the web app ***/
function Admin() {
    const [show, setShow] = useState(false);
    const [catalogYear, setCatalogYear] = useState('');
    const [degree, setDegree] = useState('');
    const [colorCategories, setColorCategories] = useState([{ name: '', color: '' }]);
    const [courseCategories, setCourseCategories] = useState([{ name: '', notes: '' }]);
    const [showTable, setShowTable] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleColorChange = (e, index, property) => {
      const { value } = e.target;
      setColorCategories((prevState) => {
        const updatedCategories = [...prevState];
        updatedCategories[index][property] = value;
        return updatedCategories;
      });
    };

    const handleColorDelete = (index) => {
      setColorCategories((prevState) => {
        const updatedCategories = [...prevState];
        updatedCategories.splice(index, 1);
        return updatedCategories;
      });
    };

    const handleColorAdd = () => {
      setColorCategories((prevState) => {
        const updatedCategories = [...prevState];
        updatedCategories.push({ name: '', color: '' });
        return updatedCategories;
      });
    };

    const handleCourseChange = (e, index, property) => {
      const { value } = e.target;
      setCourseCategories((prevState) => {
        const updatedCategories = [...prevState];
        updatedCategories[index][property] = value;
        return updatedCategories;
      });
    };

    const handleCourseDelete = (index) => {
      setCourseCategories((prevState) => {
        const updatedCategories = [...prevState];
        updatedCategories.splice(index, 1);
        return updatedCategories;
      });
    };

    const handleCourseAdd = () => {
      setCourseCategories((prevState) => {
        const updatedCategories = [...prevState];
        updatedCategories.push({ name: '', color: '' });
        return updatedCategories;
      });
    };

    



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleSelectDegree = (event) => {
      const selectedRow = event.target.closest("tr");
      const selectedDegree = event.target.value;
    
      // Remove the "highlighted" class from all rows except the selected one
      const rows = document.querySelectorAll("tbody tr");
      rows.forEach((row) => {
        if (row !== selectedRow) {
          row.classList.remove("table_highlight");
        }
      });
      // Add the "highlighted" class to the selected row
      selectedRow.classList.add("table_highlight");
      setDegree(selectedDegree);
    };

  
  
    const [catalogItems, setCatalogItems] = useState([]);
  
    useEffect(() => {
      // fetch the catalog items from the server
      fetch('http://localhost:4001/add-catalog/')
        .then(response => response.json())
        .then(data => {
          setCatalogItems(data);
        })
        .catch(error => {
          console.error('Error fetching catalog items:', error);
        });
    }, []);
  
  
      const createCatalogItem = () => {
        let apiURL = "http://localhost:4001/add-catalog/"
        
        // Validate that degree, catalogYear, and courseCategory fields are not empty
        if (!degree || !catalogYear || colorCategories.length === 0 || courseCategories.length === 0) {
          console.log('Degree, Catalog Year, Course Category, and color category are required');
          return;
        }
      
        //make sure that there is no duplicate catalog year for the specific degree 
        const existingItem = catalogItems.find(item => item.catalogYear === catalogYear && item.degree === degree);
        if (existingItem) {
          alert(`A catalog item for ${degree} ${catalogYear} already exists.`);
          return;
        }
      
        // create the new catalog item object
        let newItem = {
          "degree": degree,
          "catalogYear": catalogYear,
          "colorCategory": colorCategories,
          "courseCategory": courseCategories
        };
      
        // send a POST request to the server to save the new item
        fetch(apiURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
          mode: 'cors'
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((savedItem) => {
          //add the new item to the catalogItems state
          setCatalogItems([...catalogItems, savedItem]);
          //clear the catalogYear and courseCategory state and close the modal
          setCatalogYear('');
          setColorCategories([]);
          setCourseCategories([]);
          handleClose();
      
          // Display a success message to the user
          //alert(`Catalog item with ID ${savedItem._id} has been created successfully.`);
        })
        .catch((error) => {
          console.error(`Error creating catalog item: ${error}. Degree: ${degree}, Catalog Year: ${catalogYear}`);
          // Display an error message to the user
          //alert(`Error creating catalog item for ${degree} ${catalogYear}. Please try again later.`);
        });
      };
    
    const deleteCatalogItem = (id) => {
      let apiURL = `http://localhost:4001/add-catalog/${id}`;
    
      fetch(apiURL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        // Remove the deleted item from the catalogItems state
        setCatalogItems(catalogItems.filter((item) => item._id !== id));
        // Display a success message to the user
        // alert(`Catalog item with ID ${id} has been deleted successfully.`);
      })
      .catch((error) => {
        console.error(`Error deleting catalog item: ${error}. ID: ${id}`);
        // Display an error message to the user
        alert(`Error deleting catalog item with ID ${id}. Please try again later.`);
      });
    };
    

    const viewCatalogItem = (item) => {
      //setShowTable(true);
      setSelectedItemId(item);
    };

    const closeTable = () => {
      //setShowTable(false);
      setSelectedItemId(null);
    }
    
    // const table = (
    //   <div className="table-responsive">
    //     <table className="table table-bordered table-hover">
    //       {/* ... table content here */}
    //     </table>
    //   </div>
    // );



    return (
        <div>
        
      <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>MAJOR</th>
            <th>CAREER</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BS in Computer Science</td>
            <td>Undergraduate</td>
            <td><Button variant="outline-success" value="BS in Computer Science" onClick={handleSelectDegree}>Select</Button></td>
          </tr>
          <tr>
            <td>BA in Computer Science</td>
            <td>Undergraduate</td>
            <td><Button variant="outline-success" value="BA in Computer Science" onClick={handleSelectDegree}>Select</Button></td>
          </tr>
          <tr>
            <td>BS in Cybersecurity</td>
            <td>Undergraduate</td>
            <td><Button variant="outline-success" value="BS in Cybersecurity" onClick={handleSelectDegree}>Select</Button></td>
          </tr>
        </tbody>
      </table>
    </div>
      <hr className="my-4" />
        {degree && (
          <>
            <Button variant="success" onClick={handleShow} style={{marginBottom: '10px'}}>
              Add Catalog Year
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Catalog Year</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={createCatalogItem}>
                  <label>
                    Catalog Year:
                    <input type="text" placeholder="2023" value={catalogYear} onChange={(e) => setCatalogYear(e.target.value)} style={{marginLeft:'10px'}}/>
                  </label>
                  <br />
                  <br />
                  <label>
                    Color Categories:
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {colorCategories.map((category, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                          <input type="text" placeholder="Name (CS CORE)" value={category.name} onChange={(e) => handleColorChange(e, index, 'name')} style={{marginTop:'10px'}} />
                          <input type="text" placeholder="Color code" value={category.color} onChange={(e) => handleColorChange(e, index, 'color')} style={{marginLeft:'10px' , marginTop: '10px'}}/>
                          <button type="button" style={{marginLeft:'10px', marginTop: '10px'}} onClick={() => handleColorDelete(index)}>Delete</button>
                        </div>
                      ))}
                      <button type="button" style={{marginTop:'10px'}}onClick={handleColorAdd}>Add Category</button>
                    </div>
                  </label>
                  <br />
                  <br />
                  <label>
                    Course Categories:
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {courseCategories.map((category, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <input type="text" placeholder="Name (Gen Ed: Core Arts)" value={category.name} onChange={(e) => handleCourseChange(e, index, 'name')} style={{ width: '100%', marginTop: '10px' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <input type="number" placeholder="Credit" value={category.credits} onChange={(e) => handleCourseChange(e, index, 'credits')} style={{ width: '30%', marginRight: '10px', marginTop: '2px' }} />
                          <input type="text" placeholder="Notes" value={category.notes} onChange={(e) => handleCourseChange(e, index, 'notes')} style={{ width: '70%', marginTop: '2px' }} />
                          <button type="button" style={{ marginLeft: '10px',  marginTop: '2px' }} onClick={() => handleCourseDelete(index)}>Delete</button>
                        </div>
                      </div>
                      
                    ))}
                    <button type="button" style={{marginTop:'10px'}} onClick={handleCourseAdd}>Add Category</button>
                    </div>
                  </label>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="success" onClick={createCatalogItem}>
                  Add
                </Button>
              </Modal.Footer>
            </Modal>
      
            <div className="row">
  {catalogItems
    .filter((item) => item.degree === degree)
    .sort((a, b) => b.catalogYear.localeCompare(a.catalogYear))
    .map((item) => (
      <div className="col-xl-3 col-sm-6 mb-xl-0 mb-3" key={item.id} style={{marginTop:'10px'}}>
        <div className="card">
          <div className="card-header p-3 pt-2">
            <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
              {/* <i className="material-icons opacity-10">BSCS</i> */}
            </div>
            <div className="text-end pt-1">
              <p className="text-sm mb-0 text-capitalize">{item.degree}</p>
              <h4 className="mb-0">Catalog Year {item.catalogYear}</h4>
            </div>
          </div>
          <hr className="dark horizontal my-0"></hr>
          <div className="card-footer p-3">
            <Button className="buttonSpace" variant="success" onClick={() => viewCatalogItem(item)}> 
              View
            </Button>            
            <Button className="buttonSpace" variant="danger" onClick={() => deleteCatalogItem(item._id)}>Delete</Button>
            <Button className="buttonSpace" variant="secondary" onClick={closeTable}>Close</Button>
          </div>
        </div>
      </div>
    ))}
</div>
      {selectedItemId && (
        <div className="table-responsive">
          <Table className='listview-table'>
            <thead>
              <tr>
                <th>Course Category</th>
                <th>Credits</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {selectedItemId.courseCategory.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category.credits}</td>
                  <td>{category.notes}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
          </>
        )}
      </div>
    );
  }

export default Admin;