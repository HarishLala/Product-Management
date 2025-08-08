//package com.api.helper;
//
//import com.api.entity.Product;
//import org.apache.poi.ss.usermodel.Cell;
//import org.apache.poi.ss.usermodel.Row;
//import org.apache.poi.xssf.usermodel.XSSFSheet;
//import org.apache.poi.xssf.usermodel.XSSFWorkbook;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.InputStream;
//import java.util.ArrayList;
//import java.util.Iterator;
//import java.util.List;
//
//public class Helper {
//
//
//    //check that file is of excel type or not
//    public static boolean checkExcelFormat(MultipartFile file) {
//
//        String contentType = file.getContentType();
//
//        if (contentType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
//            return true;
//        } else {
//            return false;
//        }
//
//    }
//
//
//    //convert excel to list of products
//
//    public static List<Product> convertExcelToListOfProduct(InputStream is) {
//        List<Product> list = new ArrayList<>();
//
//        try {
//
//
//            XSSFWorkbook workbook = new XSSFWorkbook(is);
//
//            XSSFSheet sheet = workbook.getSheet("data");
//
//            int rowNumber = 0;
//            Iterator<Row> iterator = sheet.iterator();
//
//            while (iterator.hasNext()) {
//                Row row = iterator.next();
//
//                if (rowNumber == 0) {
//                    rowNumber++;
//                    // Skip header row
//                    continue;
//                }
//
//                Iterator<Cell> cells = row.iterator();
//
//                int cid = 0;
//
//                Product p = new Product();
//
//                while (cells.hasNext()) {
//                    Cell cell = cells.next();
//
//                    switch (cid) {
//                        case 0:
//                            p.setProductId((int) cell.getNumericCellValue());
//                            break;
//                        case 1:
//                            p.setProductName(cell.getStringCellValue());
//                            break;
//                        case 2:
//                            p.setProductDesc(cell.getStringCellValue());
//                            break;
//                        case 3:
//                            p.setProductPrice(cell.getNumericCellValue());
//                            break;
//                        default:
//                            break;
//                    }
//                    cid++;
//                }
//                // SKIP empty/invalid rows (e.g., ID = 0, name is blank)
//                if (p.getProductId() != 0 &&
//                        p.getProductName() != null && !p.getProductName().trim().isEmpty()) {
//                    list.add(p);
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return list;
//    }
//}
package com.api.helper;

import com.api.entity.Product;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Helper {

    // ✅ Check file type
    public static boolean checkExcelFormat(MultipartFile file) {
        return file.getContentType() != null &&
                file.getContentType().equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    // ✅ Convert Excel to List<Product>
    public static List<Product> convertExcelToListOfProduct(InputStream is) {
        List<Product> list = new ArrayList<>();

        try (XSSFWorkbook workbook = new XSSFWorkbook(is)) {
            // ✅ Try to get sheet by name or default to first sheet
            Sheet sheet = workbook.getSheet("data");
            if (sheet == null) {
                sheet = workbook.getSheetAt(0); // fallback
            }

            Iterator<Row> rows = sheet.iterator();
            int rowNumber = 0;

            while (rows.hasNext()) {
                Row row = rows.next();

                // Skip header row
                if (rowNumber++ == 0) continue;

                Product p = new Product();

                try {
                    Cell idCell = row.getCell(0);
                    Cell nameCell = row.getCell(1);
                    Cell descCell = row.getCell(2);
                    Cell priceCell = row.getCell(3);

                    if (idCell != null) p.setProductId((int) idCell.getNumericCellValue());
                    if (nameCell != null) p.setProductName(nameCell.getStringCellValue());
                    if (descCell != null) p.setProductDesc(descCell.getStringCellValue());
                    if (priceCell != null) p.setProductPrice(priceCell.getNumericCellValue());

                    // ✅ Add only if valid
                    if (p.getProductId() > 0 &&
                            p.getProductName() != null &&
                            !p.getProductName().trim().isEmpty()) {
                        list.add(p);
                    }

                } catch (Exception rowException) {
                    System.err.println("Skipping invalid row: " + row.getRowNum());
                    rowException.printStackTrace();
                }
            }

        } catch (Exception e) {
            System.err.println("Failed to parse Excel file");
            e.printStackTrace();
        }

        return list;
    }
}
