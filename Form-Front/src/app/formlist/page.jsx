'use client'
import {
    CloseOutlined,
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    EyeOutlined,
    FileTextOutlined,
    FolderViewOutlined,
    PlusOutlined,
    SearchOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import {
    Autocomplete,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import '../globals.css';
import TablePagination from "../../app/commoncomponents/TablePagination/TablePagination";
import BadgeStatus from "../../app/commoncomponents/BadgeStatus/BadgeStatus";
import InputBox from "../../app/commoncomponents/InputBox/InputBox";
import Link from 'next/link';
import TableSorting from "../../app/commoncomponents/TableSorting/TableSorting";
import AddModal from "../../app/commoncomponents/AddModal/AddModal";
import FileUpload from "../../app/commoncomponents/FileUpload/FileUpload";
import CommonDialog from "../../app/commoncomponents/CommonDialog";
import {
    commonPatchValueForFile,
    formatDateTime,
    formType,
    MessageActiveTitle,
    MessageAndTitle,
    MessagepublishTitle,
    StatusCode,
} from "../../utils/commonEnum";
import Breadcrumb from "../../app/commoncomponents/Breadcrumb/Breadcrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import TotalRecords from "../../app/commoncomponents/TablePagination/TotalRecords";
import { toast, ToastContainer } from "react-toastify";
import { formdelete, formlist, formpublishstatus, formstatus, publishstatus } from "../../done/common";

const FormList = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedFile, setselectedFile] = useState(null);

    const [pageCount, setPageCount] = useState(0);
    const [paginationSize, setPaginationSize] = useState(10);
    const [selectedPage, setselectedPage] = useState(1);
    const [dataList, setDataList] = useState([]);
    const [selectedBrandId, setselectedBrandId] = useState(null);
    const [totalRecords, setTotalRecords] = useState(null);
    const [statusAlert, setStatusAlert] = useState("success");
    const [statusDialog, setStatusDialog] = useState(false);
    const [publishDialog, setPublishDialog] = useState(false);
    const [errorAlert, setErrorAlert] = useState("delete");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [statusUpdate, setStatusUpdate] = useState(null);
    const [statusPublish, setPublishUpdate] = useState(null);
    const [brandToDelete, setBrandToDelete] = useState(null);
    const [resumeView, setResumeView] = useState(null);
    const [csvDownload, setCsvDownload] = useState(false);


    const formik = useFormik({
        initialValues: {
            search: "",
        },
        validationSchema: Yup.object({
            search: Yup.string().required("form is required"),
        }),
        onSubmit: () => {
            fetchBrandDetails();
        },
    });

    // useEffect(() => {
    // if (csvDownload) {
    //     formik.handleSubmit();
    //     setCsvDownload(false);
    // }
    // }, [csvDownload]);

    // change select dropdown pagination size
    function getPageSize(paginationValue) {
        setPaginationSize(paginationValue);
    }

    // change textfield pagination values
    function getPageCount(changeValues) {
        setselectedPage(parseInt(changeValues));
    }


    const tableHeading = [
        { id: "sNo", header: "S.No." },
        { id: "form_title", header: "Form Title" },
        { id: "form_url", header: "Form Url" },
        { id: "form_type", header: "Form Type" },
        { id: "publish_status", header: "Publish Status" },
        { id: "is_active", header: "Status" },
        { id: "action", header: "Action" },
    ];

    const fetchBrandDetails = async () => {
        try {
            const response = await formlist({
                size: paginationSize,
                page: selectedPage,
                search: formik.values.search || "",
            });
            if (response.statusCode === StatusCode.success) {
                const fetchedData = response;
                setDataList(fetchedData?.data?.forms || []);
                setTotalRecords(response?.data?.totalRecords || 0);
                setPageCount(response?.data?.count?.[0]?.total_page);
            }
        } catch (error) {
            toast.error(errorData.message || "error");
        }
    };


    // const downloadBrandModelInfo = async () => {
    //     try {
    //         const response = await downloadBrandModelExcel({
    //             search:formik?.values?.search || "",
    //         });
    //         const url = window.URL.createObjectURL(new Blob([response]));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', 'brandModel.xlsx'); // File name for the download
    //         document.body.appendChild(link);
    //         link.click();
    //         link.remove();
    //     } catch (error) {
    //         showSnackbar(response.message, "error");
    //     }
    // }

    useEffect(() => {
        fetchBrandDetails();
    }, [selectedPage, paginationSize]);

    const [visibleColumns, setVisibleColumns] = useState(
        tableHeading.reduce((acc, column) => {
            acc[column.id] = true;
            return acc;
        }, {})
    );

    // // status update API
    const brandStatusUpdate = async () => {
        const response = await formstatus({
            form_id: selectedBrandId,
        });
        if (response.statusCode === StatusCode.success) {
            setStatusUpdate(response?.data);
            fetchBrandDetails();
            toast.success("Form Status Updated successfully!");
        } else {
            commonLoader("hide");
            toast.error(response.message || "error");
        }
    };

    // // published status update API
    const brandPublisUpdate = async () => {
        const response = await publishstatus({
            form_id: selectedBrandId,
        });
        if (response.statusCode === StatusCode.success) {
            setPublishUpdate(response?.data);
            fetchBrandDetails();
            toast.success("Form Published successfully!");
        } else {
            commonLoader("hide");
            toast.error(response.message || "error");
        }
    };

    //Function call during Yes or no clicked on apply popup
    const statusClose = (value) => {
        if (value === "yes") {
            brandStatusUpdate();
            fetchBrandDetails();
            setStatusDialog(false);
        } else if (value === "no") setStatusDialog(false);
    };

    //published Function call during Yes or no clicked on apply popup
    const publishClose = (value) => {
        if (value === "yes") {
            brandPublisUpdate();
            fetchBrandDetails();
            setPublishDialog(false);
        } else if (value === "no") setPublishDialog(false);
    };

    function changeStatusClick(row) {
        setStatusDialog(true);
        setselectedBrandId(row?.id);
    }

    function changePublishStatusClick(row) {
        setPublishDialog(true);
        setselectedBrandId(row?.id);
    }

    const deleteClose = (value) => {
        if (value === "yes") {
            setDialogOpen(false);
        } else if (value === "no") setDialogOpen(false);
    };

    const handleDelete = async (id) => {
        try {
            const response = await formdelete({ form_id: id });
            if (response.statusCode === StatusCode.success) {
                setDataList((prevBrands) =>
                    prevBrands.filter((brand) => brand.id !== id)
                );
                setDialogOpen(false); // Close dialog after deletion
                fetchBrandDetails(); // Refresh list after 
                toast.success("Form deleted successfully!");
            }
        } catch (error) {
            toast.error(error.message || "error");
        }
    };

    const confirmDelete = (id) => {
        setBrandToDelete(id); // Set brand to delete
        setDialogOpen(true); // Open confirmation dialog
    };

    // const handleFileSelect1 = (file) => {
    //   setselectedFile(file);
    // };

    // const handleOpen = () => {
    //   setIsModalOpen(true);
    // };

    // const handleClose = () => {
    //   setIsModalOpen(false);
    // };

    // const fileShow = async (file_name) => {
    //     let file = await commonPatchValueForFile(file_name);
    //     if (file) {
    //     setResumeView(file);
    //     const fileURL = URL.createObjectURL(file);
    //     if (resumeView || fileURL) {
    //         window.open(fileURL, "_blank", "noopener,noreferrer");
    //     }
    //     }
    // };

    const empListingdata = {
        title: "Form List",
    };

    return (
        <>
            <ToastContainer />
            {/* page heading */}
            <Grid container item xs={12} className="headingSeparate">
                <Grid item xs={12} sm={4} md={3} lg={1.5}>
                    <Breadcrumb {...empListingdata} />
                </Grid>

                <Grid item xs={12} sm={5} md={5} lg={3.5} className="!mt-4 md:!mt-0">
                    <InputBox
                        size="small"
                        type="text"
                        className="bg-primary-Color6"
                        label="Search"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="search"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.search}
                        // error={formik?.touched?.search && Boolean(formik?.errors?.search)}
                        // helperText={formik?.touched?.search && formik?.errors?.search}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => formik.handleSubmit()}>
                                    <SearchOutlined className="text-lg" />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Grid>
                {/* <Grid item xs={12} sm={5} md={5} lg={3.5} style={{ width: "100px" }}>
                    <Autocomplete
                        fullWidth
                        size="small"
                        options={formType}
                        value={formType.find(item => item.id === formik.values.form_type) || null}
                        onChange={(event, value) => {
                            formik.setFieldValue("form_type", value ? value.id : "");
                        }}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                label="Form Type"
                            />
                        )}
                    />
                </Grid> */}
                <Grid item xs={12} sm={3} md={4} lg={2.5} className="rightSection">
                    {/* <Tooltip title="Excel Upload" placement="bottom" arrow>
                <Button
                variant="outlined"
                color="warning"
                size="small"
                className="buttonStyle !mr-2"
                onClick={() => handleOpen()}
                >
                <UploadOutlined className="mr-0" />
                </Button>
            </Tooltip>
    
            <Tooltip title="Sample" placement="bottom" arrow>
                <Button
                variant="outlined"
                color="warning"
                size="small"
                className="buttonStyle !mr-2"
                >
                <FileTextOutlined className="mr-0" />
                </Button>
            </Tooltip> */}

                    {/* <Link className="mr-2" to={"/category-add"}>
                <Tooltip title="Add Brand Model" placement="bottom" arrow>
                <Button
                    variant="contained"
                    color="success"
                    size="small"
                    className="buttonStyle"
                >
                    <PlusOutlined className="mr-0" />
                </Button>
                </Tooltip>
            </Link> */}
                    {/* <Tooltip title="Download" placement="bottom" arrow>
                    <Button
                        onClick={() => setCsvDownload(true)}
                        variant="contained"
                        color="success"
                        size="small"
                        className="buttonStyle"
                    >
                        <DownloadOutlined className="mr-0" />
                    </Button>
                </Tooltip> */}
                </Grid>
            </Grid>

            <div className="mb-5 w-full">
                <TotalRecords
                    totalRecords={totalRecords}
                />
            </div>

            {/* listing */}
            <Grid item xs={12}>
                <TableContainer component={Paper} className="tableShadow">
                    <TableSorting tableData={dataList} initialOrderBy="brandName">
                        {({ order, orderBy, tablesBody, handleSortRequest }) => (
                            <Table size="small" aria-label="a dense table">
                                <TableHead className="tableHeads">
                                    <TableRow>
                                        {tableHeading.map(
                                            (column) =>
                                                visibleColumns[column.id] && (
                                                    <TableCell
                                                        className="tableAdminStyle"
                                                        key={column.id}
                                                        sortDirection={
                                                            orderBy === column.id ? order : false
                                                        }
                                                    >
                                                        {column.header !== "Action" ? (
                                                            <TableSortLabel
                                                                active={orderBy === column.id}
                                                                direction={
                                                                    orderBy === column.id ? order : "asc"
                                                                }
                                                            // onClick={() => handleSortRequest(column.id)}
                                                            >
                                                                {column.header}
                                                            </TableSortLabel>
                                                        ) : (
                                                            column.header
                                                        )}
                                                    </TableCell>
                                                )
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tablesBody && tablesBody.length > 0 ? (
                                        tablesBody?.map((row, index) => (
                                            <TableRow key={index} className="tableOdd">
                                                {tableHeading.map(
                                                    (column) =>
                                                        visibleColumns[column.id] && (
                                                            <TableCell
                                                                key={column.id}
                                                                className="tableAdminCellStyle"
                                                            >
                                                                {column.id === "sNo" ? (
                                                                    index +
                                                                    1 +
                                                                    (selectedPage - 1) * paginationSize
                                                                ) : column.id === "form_title" ? (
                                                                    row.form_title
                                                                ) : column.id === "form_url" ? (
                                                                    // Make the form_url clickable with navigation
                                                                    <Link href={`${process.env.NEXT_PUBLIC_FRONT_URL}publishedform?form=${row.form_url}`} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer">
                                                                        {row.form_url}
                                                                    </Link>
                                                                ) : column.id === "form_type" ? (
                                                                    row.form_type
                                                                ) : column.id === "is_active" ? (
                                                                    row.is_active === 1 ? (
                                                                        <span
                                                                            onClick={() => changeStatusClick(row)}
                                                                        >
                                                                            <BadgeStatus variant="active">
                                                                                Active
                                                                            </BadgeStatus>
                                                                        </span>
                                                                    ) : (
                                                                        <span
                                                                            onClick={() => changeStatusClick(row)}
                                                                        >
                                                                            <BadgeStatus variant="deactive">
                                                                                Inactive
                                                                            </BadgeStatus>
                                                                        </span>
                                                                    )
                                                                ) : column.id === "publish_status" ? (
                                                                    row.publish_status === 2 ? (
                                                                        <span
                                                                            onClick={() => changePublishStatusClick(row)}
                                                                        >
                                                                            <BadgeStatus variant="active">Published</BadgeStatus>
                                                                        </span>
                                                                    ) : (
                                                                        <span
                                                                            onClick={() => changePublishStatusClick(row)}
                                                                        >
                                                                            <BadgeStatus variant="deactive">Unpublished</BadgeStatus>
                                                                        </span>
                                                                    )
                                                                ) : column.id === "sNo" ? (
                                                                    index +
                                                                    1 +
                                                                    (selectedPage - 1) * paginationSize
                                                                ) : column.id === "created_at" ? (
                                                                    formatDateTime(row.created_at)
                                                                ) : column.id === "specify" ? (
                                                                    <Link
                                                                        className="flex items-center gap-3"
                                                                    // onClick={() => {
                                                                    // fileShow(row?.file);
                                                                    // }}
                                                                    >
                                                                        <Tooltip title="View" arrow>
                                                                            <EyeOutlined className="viewIcons" />
                                                                        </Tooltip>
                                                                    </Link>
                                                                ) : column.id === "photo_1" ? (
                                                                    <div className="flex">
                                                                        <Link
                                                                            className="flex items-center gap-3"
                                                                        // onClick={() => {
                                                                        //     fileShow(row?.photo_1);
                                                                        // }}
                                                                        >
                                                                            <Tooltip title="View Photo 1" arrow>
                                                                                <EyeOutlined className="viewIcons" />
                                                                            </Tooltip>
                                                                        </Link>

                                                                        <Link
                                                                            className="flex items-center gap-3"
                                                                        // onClick={() => {
                                                                        //     fileShow(row?.photo_2);
                                                                        // }}
                                                                        >
                                                                            <Tooltip title="View Photo 2" arrow>
                                                                                <EyeOutlined className="viewIcons" />
                                                                            </Tooltip>
                                                                        </Link>
                                                                        {row?.photo_3 && <Link
                                                                            className="flex items-center gap-3"
                                                                        // onClick={() => {
                                                                        //     fileShow(row?.photo_3);
                                                                        // }}
                                                                        >
                                                                            <Tooltip title="View Photo 3" arrow>
                                                                                <EyeOutlined className="viewIcons" />
                                                                            </Tooltip>
                                                                        </Link>}
                                                                        {row?.photo_4 && <Link
                                                                            className="flex items-center gap-3"
                                                                        // onClick={() => {
                                                                        //     fileShow(row?.photo_4);
                                                                        // }}
                                                                        >
                                                                            <Tooltip title="View Photo 4" arrow>
                                                                                <EyeOutlined className="viewIcons" />
                                                                            </Tooltip>
                                                                        </Link>}
                                                                    </div>
                                                                ) : column.id !== "action" ? (
                                                                    row[column.id]
                                                                ) : (
                                                                    <>
                                                                        <Link
                                                                            href={{
                                                                                pathname: `/formbuilder/${row.id}`,
                                                                            }}
                                                                        >
                                                                            <Tooltip title="Edit" arrow>
                                                                                <EditOutlined className="editIcons" style={{ cursor: 'pointer' }} />
                                                                            </Tooltip>
                                                                        </Link>

                                                                            <Link
                                                                            href={{
                                                                                pathname: `/formresponse/${row.id}`,
                                                                            }}
                                                                        >
                                                                            <Tooltip title="View" arrow>
                                                                                <EyeOutlined className="viewIcons" style={{ cursor: 'pointer' }} />
                                                                            </Tooltip>
                                                                        </Link>

                                                                        {row.publish_status !== 2 && (<Tooltip title="Delete" arrow>
                                                                            <span onClick={() => confirmDelete(row.id)} style={{ cursor: 'pointer' }}>
                                                                                <DeleteOutlined className="deleteIcons" />
                                                                            </span>
                                                                        </Tooltip>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </TableCell>
                                                        )
                                                )}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={tableHeading.length}
                                                className="!text-center"
                                            >
                                                No data available
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </TableSorting>
                </TableContainer>

                <TablePagination
                    pageCount={pageCount}
                    selectedPage={selectedPage}
                    paginationSize={paginationSize}
                    getPageSize={getPageSize}
                    getPageCount={getPageCount}
                    maxPage={pageCount}
                    totalRecords={totalRecords}
                />
            </Grid>

            {/* file upload modal */}
            {/* <AddModal open={isModalOpen} handleClose={handleClose} classname="">
            <div>
            <h1 className="modalHeading">Excel Upload</h1>
            </div>
            <div className="mt-5">
            <FileUpload
                onFileSelect={handleFileSelect1}
                fileId="file1"
                buttonLabel="Upload Excel"
                acceptedFileTypes=".xlsx, .xls"
            />
            {selectedFile?.name && (
                <p className="fileNames">{selectedFile?.name}</p>
            )}
            </div>
            <div item xs={12} className="flex mt-5 gap-4 flex-row justify-end">
            <Button
                variant="contained"
                color="success"
                size="small"
                className="buttonStyle"
                onClick={handleClose}
            >
                <UploadOutlined className="mr-1" />
                Upload
            </Button>
    
            <Button
                variant="contained"
                color="info"
                size="small"
                className="buttonStyle"
                onClick={handleClose}
            >
                <CloseOutlined className="mr-1" />
                Cancel
            </Button>
            </div>
        </AddModal> */}

            {/* status update Dialog */}
            <CommonDialog
                open={statusDialog}
                onClose={statusClose}
                title=""
                content={MessageActiveTitle.ApplyContent}
                actions={
                    <>
                        <Button
                            type="button"
                            variant="outlined"
                            className="!mr-1"
                            color="primary"
                            size="small"
                            onClick={() => statusClose("no")}
                        >
                            No
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => statusClose("yes")}
                        >
                            Yes, sure
                        </Button>
                    </>
                }
                errorAlert={statusAlert}
            />
            {/* publish update Dialog */}
            <CommonDialog
                open={publishDialog}
                onClose={publishClose}
                title=""
                content={MessagepublishTitle.ApplyContent}
                actions={
                    <>
                        <Button
                            type="button"
                            variant="outlined"
                            className="!mr-1"
                            color="primary"
                            size="small"
                            onClick={() => publishClose("no")}
                        >
                            No
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => publishClose("yes")}
                        >
                            Yes, sure
                        </Button>
                    </>
                }
                errorAlert={statusAlert}
            />

            {/* Delete Confirmation Dialog */}
            <CommonDialog
                open={dialogOpen}
                onClose={deleteClose}
                title=""
                content={MessageAndTitle.ApplyContent}
                actions={
                    <>
                        <Button
                            type="button"
                            variant="outlined"
                            className="!mr-1"
                            color="primary"
                            size="small"
                            onClick={() => deleteClose("no")}
                        >
                            No
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleDelete(brandToDelete)}
                        >
                            Yes, sure
                        </Button>
                    </>
                }
                errorAlert={errorAlert}
            />
        </>
    );
};

export default FormList
