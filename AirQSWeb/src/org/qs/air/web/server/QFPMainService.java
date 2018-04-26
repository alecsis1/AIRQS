package org.qs.air.web.server;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "QFPMainService", value = "")
public class QFPMainService extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html; charset=UTF-8");

		PrintWriter out = resp.getWriter();
		out.write("<!DOCTYPE html>");
		out.write("<html lang=\"en\">");
		out.write("<head>");
		out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">");
		out.write("<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">");
		out.write("<title>Qualibrate Foundation Platform</title>");
		out.write("<script type=\"text/javascript\" src=\"javascript/atmosphere.js\"></script>");
		out.write("<script type=\"text/javascript\" src=\"javascript/pdfmake.js\"></script>");
		out.write("<script type=\"text/javascript\" src=\"javascript/vfs_fonts.js\"></script>");
		out.write("<script type=\"text/javascript\" src=\"webclient/webclient.nocache.js?" + System.currentTimeMillis()
				+ "\"></script>");
		out.write("</head>");
		out.write("<body>");
		out.write(
				"<div id=\"mainLoader\" style=\"position: fixed;top: 0px;right: 0px;bottom: 0px;left: 0px;z-index: 9998;background-color: #FCFCFC;padding: 0;border: 0;margin: 0;\">");
		out.write(
				"<img src=\"images/login/loader.gif\" style=\"position: fixed;top: 40%;left: 50%;transform: translate(-50%, -50%);\">");
		out.write(
				"<div style=\"top: 50%; width: 100%; height: 50px; text-align: center; color: #6A6A6A; font-size: 24px; margin-right: auto; margin-left: auto; display: block; position: fixed; z-index: 9999; font-family: Lato,Segoe UI Semibold,sans-serif; letter-spacing: 4px;\">LOADING...</div>");
		out.write("</div>");
		out.write("<iframe id=\"__gwt_historyFrame\" style=\"width:0;height:0;border:0;display:block;\"></iframe>");
		out.write("</body>");
		out.write("</html>");
	}
}
