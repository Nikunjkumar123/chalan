import pdf from "html-pdf";

const GeneratePdf = async (req, res) => {
  try {
    const { htmlContent } = req.body;

    if (!htmlContent) {
      return res.status(400).json({ message: "htmlContent is required" });
    }

    // Generate PDF from HTML
    pdf.create(htmlContent, { format: "A4" }).toBuffer((err, buffer) => {
      if (err) {
        console.error("PDF generation error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      let filename = `invoice_${Date.now()}.pdf`;
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `inline; filename=${filename}`);
      return res.end(buffer);
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { GeneratePdf };