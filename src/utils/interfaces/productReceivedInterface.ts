export interface ProductReceivedInterface {
    code: string; // Unique identifier for the product
    units: number; // Number of units received
    description: string; // Description of the product
    unitsPerPackage: number; // Number of units per package
    units_odc: number; // Units from the purchase order
}