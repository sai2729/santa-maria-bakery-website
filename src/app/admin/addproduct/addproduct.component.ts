import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ProductService } from 'src/app/services/product.service';
import { ActionButtonRendererComponent } from './action-button-renderer.component';
interface InventoryItem {
  id: number;
  product: string;
  category: string;
  quantity: number;
  expiryDate: string;
}
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  columnDefs: ColDef[] = [
    {
      field: 'image',
      headerName: 'Product Image',
      cellRenderer: (params: any) => {
        if (params.value) {
          return `<img src="data:image/jpeg;base64,${params.value}" alt="Product Image" style="width:50px; height:50px; object-fit:cover;">`;
        } else {
          return `<span>No Image</span>`;
        }
      },
      autoHeight: true,
      resizable: true,
    },
    { field: 'name', headerName: 'Product Name', sortable: true, filter: true },
    { field: 'price', headerName: 'Price ($)', sortable: true, filter: true },
    { field: 'description', headerName: 'Product Description', resizable: true },
    {
      field: 'status',
      headerName: 'Product Status',
      cellRenderer: (params: any) => {
        const color = params.value === 'In Stock' ? '#28a745' : '#dc3545'; // Green or Red
        return `<span style="padding: 0.25em 0.5em; font-size: 75%; font-weight: bold; color: white; background-color: ${color}; border-radius: 0.375rem;">${params.value}</span>`;
      },
      sortable: true,
      filter: true,
    },
      {
        headerName: 'Actions',
        field: 'id', // Any field you want to identify the row
        cellRendererFramework: ActionButtonRendererComponent,
        cellRendererParams: {
          onDelete: this.onDeleteRow.bind(this), // Pass the delete handler
        },
        width: 150,
      },
  ];

  rowData: any[] = []; // Initialize as an empty array
  selectedImage: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.rowData = data; // Assign the fetched data to rowData
        console.log('Fetched products:', this.rowData);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
  };

  newProduct = {
    name: '',
    price: 0,
    description: '',
    status: 'In Stock',
  };

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  addProduct(): void {
    if (!this.selectedImage) {
      alert('Please select an image!');
      return;
    }
  
    this.productService.addProductWithImage(this.newProduct, this.selectedImage).subscribe(
      (response) => {
        console.log('Product added successfully:', response);
        alert('Product added successfully!');
        // Reset the form
        this.newProduct = {
          name: '',
          price: 0,
          description: '',
          status: 'In Stock',
        };
        this.selectedImage = null;
      },
      (error) => {
        console.error('Error adding product:', error);
        alert('Failed to add product. Please try again.');
      }
    );
  }
  onDeleteRow(rowData: any): void {
    const confirmDelete = confirm(`Are you sure you want to delete the product: ${rowData.name}?`);
    if (confirmDelete) {
      this.productService.deleteProduct(rowData.id).subscribe(
        () => {
          // Remove the deleted row from rowData
          this.rowData = this.rowData.filter((row) => row.id !== rowData.id);
  
          // Refresh the grid
          this.agGrid.api.setRowData(this.rowData);
          alert(`Product with ID ${rowData.id} deleted successfully!`);
        },
        (error) => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product. Please try again.');
        }
      );
    }
  }

  onSearch(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.agGrid.api.setQuickFilter(searchValue);
  }}
