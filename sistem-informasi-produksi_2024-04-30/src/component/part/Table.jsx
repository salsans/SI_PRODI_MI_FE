import Icon from "./Icon";

export default function Table({
  data,
  disabledActions = {},
  onToggle = () => {},
  onDelete = () => {},
  onDetail = () => {},
  onEdit = () => {},
  onApprove = () => {},
  onReject = () => {},
  onSent = () => {},
  onUpload = () => {},
  onFinal = () => {},
  onMechanic = () => {},
  onDownloadPDF = () => {},
  onMakeQuotation = () => {},
  onDt = () => {},
  onAddRow = () => {},
  onPdf = () => {},
  onQuotation = () => {},
  onBooking = () => {},
  onStatus = () => {},
  onMekanikUpdate = () => {},
  downloadedPDFIds = [],
  onNext = () => {},
  
}) {
  let colPosition;
  let colCount = 0;

  function generateActionButton(columnName, value, key, id, status) {
    if (columnName !== "Aksi") return value;

    const listButton = value.map((action) => {
      switch (action) {
        case "Toggle": {
          if (status === "Aktif") {
            return (
              <Icon
                key={key + action}
                name="toggle-on"
                type="Bold"
                cssClass="btn px-1 py-0 text-primary"
                title="Nonaktifkan"
                onClick={() => onToggle(id)}
              />
            );
          } else if (status === "Tidak Aktif") {
            return (
              <Icon
                key={key + action}
                name="toggle-off"
                type="Bold"
                cssClass="btn px-1 py-0 text-secondary"
                title="Aktifkan"
                onClick={() => onToggle(id)}
              />
            );
          }
        }
        case "Status": {
          if (status === "Aktif") {
            return (
              <Icon
                key={key + action}
                name="toggle-on"  
                type="Bold"
                cssClass="btn px-1 py-0 text-primary"
                title="Nonaktifkan"
                onClick={() => onStatus(id)}
              />
            );
          } else if (status === "Tidak Aktif") {
            return (
              <Icon
                key={key + action}
                name="toggle-off"  
                type="Bold"
                cssClass="btn px-1 py-0 text-secondary"
                title="Aktifkan"
                onClick={() => onStatus(id)}
              />
            );
          }
        }   
        case "Delete":
          return (
            <Icon
              key={key + action}
              name="trash"
              type="Bold"
              cssClass="btn px-1 py-0 text-danger"
              title="Delete"
              onClick={() => onDelete(id)}
            />
          );
        case "Detail":
          return (
            <Icon
              key={key + action}
              name="overview"
              type="Bold"
              cssClass="btn px-1 py-0 text-primary"
              title="Show Details"
              onClick={() => onDetail("detail", id)}
            />
          );
          case "Booking":
          return (
            <Icon
              key={key + action}
              name="calendar-check"
              type="Bold"
              cssClass="btn px-1 py-0 text-primary"
              title="Make Customer Booking"
              onClick={() => onBooking("booking", id)}
            />
          );
          case "Penawaran":
          return (
            <Icon
              key={key + action}
              name="overview"
              type="Bold"
              cssClass="btn px-1 py-0 text-primary"
              title="Make Quotation"
              onClick={() => onQuotation("penawaran", id)}
            />
          );
          case "Dt":
          return (
            <Icon
              key={key + action}
              name="overview"
              type="Bold"
              cssClass="btn px-1 py-0 text-primary"
              title="Buat Penawaran"
              onClick={() => onDt("dt", id)}
              selectedTransactionId={id}
            />
          );
            
        case "Edit":
          return (
            <Icon
              key={key + action}
              name="edit"
              type="Bold"
              cssClass="btn px-1 py-0 text-primary"
              title="Edit"
              onClick={() => onEdit("edit", id)}
            />
          );
        case "Approve":
          return (
            <Icon
              key={key + action}
              name="check"
              type="Bold"
              cssClass="btn px-1 py-0 text-success"
              title="Setujui Pengajuan"
              onClick={onApprove}
            />
          );
        case "Reject":
          return (
            <Icon
              key={key + action}
              name="cross"
              type="Bold"
              cssClass="btn px-1 py-0 text-danger"
              title="Tolak Pengajuan"
              onClick={onReject}
            />
          );
        case "Sent":
          return (
            <Icon
              key={key + action}
              name="paper-plane"
              type="Bold"
              cssClass="btn px-1 py-0 text-primary"
              title="Kirim"
              onClick={() => onSent(id)}
            />
          );
        case "Upload":
          return (
            <Icon
              key={key + action}
              name="file-upload"
              type="Bold"
              cssClass="btn px-1 py-0 text-primary"
              title="Unggah Berkas"
              onClick={() => onUpload(id)}
            />
          );
        case "Final":
          return (
            <Icon
              key={key + action}
              name="gavel"
              type="Bold"
              cssClass="btn px-1 py-0 text-primary"
              title="Finalkan"
              onClick={() => onFinal(id)}
            />
          );
          case "Mechanic":
          return (
            <Icon
              key={key + action}
              name="wrench"
              type="Bold"
              cssClass="btn px-1 py-0 text-primary"
              title="Mechanic"
              onClick={() => onMechanic(id)}
            />
          );
          case "PDF":
          return (
            <Icon
              key={key + action}
              name="file-download"
              type="Bold"
              cssClass="btn px-1 py-0 text-primary"
              title="Print PDF"
              onClick={() => onPdf(id)}
            />
          );
          case "Download PDF":
          return (
            <Icon
              key={key + action}
              name="file-download"
              type="Bold"
              cssClass={`btn px-1 py-0 ${downloadedPDFIds.includes(id) ? "text-muted" : "text-primary"}`}
              title="Download Inspection Check"
              onClick={() => !downloadedPDFIds.includes(id) && onDownloadPDF(id)}
              disabled={downloadedPDFIds.includes(id)}
            />
          );
          
          case "Quotation":
          return (
            <Icon
              key={key + action}
              name="overview"
              type="Bold"
              cssClass="btn px-1 py-0 text-primary"
              title="Make Quotation"
              onClick={() => onMakeQuotation("Quotation", id)}
            />
          );
          case "row":
          return (
            <Icon
              key={key + action}
              name="plus"
              type="Bold"
              cssClass="btn px-1 py-0 text-primary"
              title="Add"
              onClick={() => onAddRow("row",id)}
            />
          );
          case "Next":
          return (
            <Icon
              key={key + action}
              name="forward"
              type="Bold"
              cssClass="btn px-1 py-0 text-primary"
              title="Make Work Order"
              onClick={() => onNext("next",id)}
              disabled={disabledActions[id]}
            />
          );
          case "UpMekanik":
            const iconType = "check-circle";
            const iconTitle = "Finish Job";

            const handleClick = () => {
              const newStatus = status === 1 ? 2 : 1; 
              onMekanikUpdate(id, newStatus); 
            };

            return (
              <Icon
                key={key + action}
                name={iconType}
                type="Bold"
                cssClass="btn px-1 py-0 text-primary"
                title={iconTitle}
                onClick={handleClick} 
              />
            ); 
        default:
          return null;
      }
    });

    return listButton;
  }

  return (
    <div className="flex-fill">
      <table className="table table-hover table-striped table table-light border">
        <thead>
          <tr>
            {Object.keys(data[0]).map((value, index) => {
              if (
                value !== "Key" &&
                value !== "Count" &&
                value !== "Alignment" &&
                value !== "No"
              ) {
                colCount++;
                return (
                  <th key={"Header" + index} className="text-center">
                    {value}
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {data[0].Count !== 0 &&
            data.map((value, rowIndex) => {
              colPosition = -1;
              return (
                <tr
                  key={value["Key"]}
                  className={
                    value["Status"] && value["Status"] === "Draft"
                      ? "fw-bold"
                      : undefined
                  }
                >
                  {Object.keys(value).map((column, colIndex) => {
                    if (
                      column !== "Key" &&
                      column !== "Count" &&
                      column !== "Alignment" &&
                      column !== "No" 
                    ) {
                      colPosition++;
                      return (
                        <td
                          key={rowIndex + "" + colIndex}
                          style={{
                            textAlign: value["Alignment"][colPosition],
                          }}
                        >
                          {generateActionButton(
                            column,
                            value[column],
                            "Action" + rowIndex + colIndex,
                            value["Key"],
                            value["Status"]
                          )}
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          {data[0].Count === 0 && (
            <tr>
              <td colSpan={colCount}>Tidak ada data.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}