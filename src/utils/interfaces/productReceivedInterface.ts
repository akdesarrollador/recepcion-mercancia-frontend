export interface ProductReceivedInterface {
    productCode: string; // Unique identifier for the product
    productUnits: number; // Number of units received
    productDescription?: string; // Description of the product
    productUnitsPerPackage?: number; // Number of units per package
}